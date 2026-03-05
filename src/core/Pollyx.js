import { DiffEngine } from './DiffEngine';
import { WebSocketManager } from './WebSocketManager';
import { RetryStrategy } from './RetryStrategy';
import { Logger } from '../utils/logger';

export class Pollyx {
    static version = '1.0.2';
    static instances = new Map();
    static defaultOptions = {
        interval: 60000,
        url: typeof window !== 'undefined' ? window.location.href : '/',
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'text/html'
        },
        retry: {
            maxAttempts: 3,
            baseDelay: 1000,
            maxDelay: 30000,
            factor: 2,
            jitter: true
        },
        deduplicate: true,
        diffUpdates: true,
        preserveFocus: true,
        websocket: {
            enabled: false,
            url: null,
            fallbackAfter: 3,
            reconnectInterval: 5000
        },
        autoStart: true,
        debug: false,
        onUpdate: null,
        onError: null,
        onStatusChange: null
    };

    constructor(element, options = {}) {
        if (!element) {
            throw new Error('Pollyx: Element is required');
        }

        this.id = Symbol('polling-instance');
        this.element = element;
        this.options = this.mergeOptions(Pollyx.defaultOptions, options);

        this.diffEngine = new DiffEngine();
        this.retryStrategy = new RetryStrategy(this.options.retry);
        this.wsManager = this.options.websocket.enabled ?
            new WebSocketManager(this.options.websocket, this) : null;

        this.logger = new Logger(this.options.debug);

        this.state = {
            fetching: false,
            retryCount: 0,
            error: null,
            lastUpdate: null,
            lastHtml: null,
            useWebSocket: this.options.websocket.enabled,
            wsErrorCount: 0,
            isActive: false
        };

        this.pendingRequests = new Map();
        this.intervalId = null;
        this.abortController = null;
        this.handlers = new Map();

        this.fetch = this.fetch.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleWebSocketMessage = this.handleWebSocketMessage.bind(this);

        Pollyx.instances.set(this.id, this);

        if (this.options.autoStart) {
            this.start();
        }

        this.logger.info('Pollyx initialized');
    }

    mergeOptions(defaults, custom) {
        const merged = { ...defaults };

        for (const key in custom) {
            if (key === 'retry' || key === 'websocket') {
                merged[key] = { ...defaults[key], ...custom[key] };
            } else {
                merged[key] = custom[key];
            }
        }

        return merged;
    }

    start() {
        if (this.state.isActive) {
            this.logger.warn('Polling already active');
            return;
        }

        this.state.isActive = true;
        this.state.retryCount = 0;

        if (this.wsManager && this.state.useWebSocket) {
            this.wsManager.connect();
            this.wsManager.on('message', this.handleWebSocketMessage);
        }

        this.intervalId = setInterval(() => this.fetch(), this.options.interval);
        this.addVisibilityListener();

        this.emitStatus('started');
        this.logger.info('Polling started');
    }

    stop() {
        if (!this.state.isActive) return;

        this.state.isActive = false;

        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        if (this.wsManager) {
            this.wsManager.disconnect();
            this.wsManager.off('message', this.handleWebSocketMessage);
        }

        this.removeVisibilityListener();
        this.emitStatus('stopped');
        this.logger.info('Polling stopped');
    }

    async fetch(force = false) {
        if (!this.state.isActive && !force) return;
        if (this.state.fetching && !force) return;

        if (this.options.deduplicate && this.pendingRequests.has(this.options.url)) {
            this.logger.debug('Using cached request');
            return this.pendingRequests.get(this.options.url);
        }

        if (this.wsManager && this.state.useWebSocket && this.wsManager.isConnected()) {
            this.logger.debug('Using WebSocket instead of fetch');
            return null;
        }

        this.abortController = new AbortController();
        this.state.fetching = true;
        this.state.error = null;

        this.emitStatus('fetching');
        this.logger.debug('Fetching...');

        const requestPromise = this.performFetch();

        if (this.options.deduplicate) {
            this.pendingRequests.set(this.options.url, requestPromise);
            requestPromise.finally(() => {
                this.pendingRequests.delete(this.options.url);
            });
        }

        return requestPromise;
    }

    async performFetch() {
        try {
            const response = await fetch(this.options.url, {
                method: this.options.method,
                headers: this.options.headers,
                signal: this.abortController.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const html = await response.text();

            this.state.retryCount = 0;
            this.state.lastUpdate = Date.now();

            await this.processUpdate(html);

            if (typeof this.options.onUpdate === 'function') {
                this.options.onUpdate(html, this);
            }

            this.emitStatus('success');
            this.logger.debug('Fetch successful');

            return html;
        } catch (error) {
            if (error.name === 'AbortError') {
                this.logger.debug('Fetch aborted');
                return;
            }

            this.state.error = error;
            this.emitStatus('error', { error: error.message });

            if (typeof this.options.onError === 'function') {
                this.options.onError(error, this);
            }

            this.logger.error('Fetch failed', error);

            if (this.retryStrategy.shouldRetry(this.state.retryCount + 1, error)) {
                await this.retry();
            }

            throw error;
        } finally {
            this.state.fetching = false;
            this.abortController = null;
        }
    }

    async retry() {
        this.state.retryCount++;

        const delay = this.retryStrategy.getDelayForAttempt(this.state.retryCount);

        this.emitStatus('retrying', {
            attempt: this.state.retryCount,
            delay
        });

        this.logger.debug('Retrying', { attempt: this.state.retryCount, delay });

        await new Promise(resolve => setTimeout(resolve, delay));

        return this.fetch(true);
    }

    async processUpdate(newHtml) {
        if (!this.options.diffUpdates) {
            this.element.innerHTML = newHtml;
            this.executeHandlers(newHtml, this.state.lastHtml);
            return;
        }

        const diff = this.diffEngine.computeDiff(
            this.state.lastHtml || this.element.innerHTML,
            newHtml
        );

        if (diff.hasChanges) {
            this.diffEngine.applyDiffToElement(this.element, diff);
            this.executeHandlers(newHtml, this.state.lastHtml, diff);

            this.emitStatus('diff_applied', diff.statistics);
            this.logger.debug('Diff applied', diff.statistics);
        }

        this.state.lastHtml = newHtml;
    }

    executeHandlers(newHtml, oldHtml, diff = null) {
        this.handlers.forEach((handler, name) => {
            try {
                handler.call(this.element, newHtml, oldHtml, this, diff);
            } catch (error) {
                this.logger.error(`Handler "${name}" failed`, error);
            }
        });
    }

    handleWebSocketMessage(data) {
        this.logger.debug('WebSocket message received');
        this.processUpdate(data);
    }

    registerHandler(name, handler) {
        if (typeof handler !== 'function') {
            throw new Error('Handler must be a function');
        }
        this.handlers.set(name, handler);
        this.emitStatus('handler_registered', { name });
        this.logger.debug('Handler registered', { name });
    }

    unregisterHandler(name) {
        this.handlers.delete(name);
        this.emitStatus('handler_unregistered', { name });
    }

    addVisibilityListener() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    removeVisibilityListener() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.stop();
        } else {
            this.start();
            this.fetch();
        }
    }

    emitStatus(status, data = {}) {
        const event = new CustomEvent('pollyx:status', {
            detail: {
                status,
                instance: this,
                timestamp: Date.now(),
                ...data
            },
            bubbles: true
        });

        this.element.dispatchEvent(event);

        if (typeof this.options.onStatusChange === 'function') {
            this.options.onStatusChange(status, data, this);
        }
    }

    destroy() {
        this.stop();
        Pollyx.instances.delete(this.id);
        this.logger.info('Pollyx destroyed');
    }

    static getInstance(id) {
        return Pollyx.instances.get(id);
    }

    static getAllInstances() {
        return Array.from(Pollyx.instances.values());
    }

    static stopAll() {
        Pollyx.instances.forEach(instance => instance.stop());
    }

    static startAll() {
        Pollyx.instances.forEach(instance => instance.start());
    }

    static destroyAll() {
        Pollyx.instances.forEach(instance => instance.destroy());
    }
}