export class WebSocketManager {
    constructor(options = {}, pollingInstance) {
        this.options = {
            url: null,
            reconnectInterval: 5000,
            fallbackAfter: 3,
            ...options
        };

        this.polling = pollingInstance;
        this.ws = null;
        this.errorCount = 0;
        this.reconnectTimer = null;
        this.eventHandlers = new Map();

        this.handleOpen = this.handleOpen.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    connect() {
        if (!this.options.url) {
            console.error('WebSocket URL is required');
            return;
        }

        try {
            this.ws = new WebSocket(this.options.url);

            this.ws.onopen = this.handleOpen;
            this.ws.onmessage = this.handleMessage;
            this.ws.onerror = this.handleError;
            this.ws.onclose = this.handleClose;

        } catch (error) {
            console.error('WebSocket connection failed:', error);
            this.handleFallback();
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }

        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }

    handleOpen() {
        this.errorCount = 0;
        this.emit('open');
    }

    handleMessage(event) {
        this.emit('message', event.data);
    }

    handleError(error) {
        this.errorCount++;
        this.emit('error', error);

        if (this.errorCount >= this.options.fallbackAfter) {
            this.handleFallback();
        }
    }

    handleClose() {
        this.emit('close');

        if (this.polling.state.useWebSocket && this.errorCount < this.options.fallbackAfter) {
            this.reconnectTimer = setTimeout(() => {
                this.connect();
            }, this.options.reconnectInterval);
        }
    }

    handleFallback() {
        this.polling.state.useWebSocket = false;
        this.disconnect();
        this.emit('fallback');
    }

    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    on(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, new Set());
        }
        this.eventHandlers.get(event).add(handler);
    }

    off(event, handler) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).delete(handler);
        }
    }

    emit(event, data) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in WebSocket ${event} handler:`, error);
                }
            });
        }
    }
}