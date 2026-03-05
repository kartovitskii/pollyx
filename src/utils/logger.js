export class Logger {
    constructor(debug = false) {
        this.debugMode = debug;
        this.prefix = '[Pollyx]';
    }

    info(...args) {
        if (this.debugMode) {
            console.log(this.prefix, '[INFO]', ...args);
        }
    }

    warn(...args) {
        if (this.debugMode) {
            console.warn(this.prefix, '[WARN]', ...args);
        }
    }

    error(...args) {
        // Ошибки логируем всегда, независимо от debugMode
        console.error(this.prefix, '[ERROR]', ...args);
    }

    debug(...args) {
        if (this.debugMode) {
            console.debug(this.prefix, '[DEBUG]', ...args);
        }
    }

    log(...args) {
        if (this.debugMode) {
            console.log(this.prefix, '[LOG]', ...args);
        }
    }

    setDebug(enabled) {
        this.debugMode = enabled;
    }

    isDebug() {
        return this.debugMode;
    }
}