export class RetryStrategy {
    constructor(options = {}) {
        this.options = {
            maxAttempts: 3,
            baseDelay: 1000,
            maxDelay: 30000,
            factor: 2,
            jitter: true,
            ...options
        };

        this.reset();
    }

    calculateDelay(attempt) {
        let delay = this.options.baseDelay * Math.pow(this.options.factor, attempt - 1);
        delay = Math.min(delay, this.options.maxDelay);

        if (this.options.jitter) {
            delay = delay * (0.5 + Math.random() * 0.5);
        }

        return Math.floor(delay);
    }

    shouldRetry(attempt, error) {
        this.state.lastAttempt = attempt;
        this.state.lastError = error;

        if (attempt >= this.options.maxAttempts) {
            this.state.exceededMaxAttempts = true;
            return false;
        }

        if (error && error.name === 'AbortError') {
            this.state.aborted = true;
            return false;
        }

        return true;
    }

    getDelayForAttempt(attempt) {
        const delay = this.calculateDelay(attempt);
        this.state.lastDelay = delay;

        return delay;
    }

    reset() {
        this.state = {
            attempt: 0,
            lastAttempt: null,
            lastError: null,
            lastDelay: null,
            exceededMaxAttempts: false,
            aborted: false,
            startTime: Date.now()
        };
    }

    resetAttempts() {
        this.state.attempt = 0;
        this.state.lastAttempt = null;
        this.state.lastError = null;
        this.state.lastDelay = null;
        this.state.exceededMaxAttempts = false;
        this.state.aborted = false;
    }

    getState() {
        return { ...this.state };
    }

    isReset() {
        return this.state.attempt === 0 &&
            this.state.lastAttempt === null &&
            this.state.lastError === null;
    }
}