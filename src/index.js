// Core
export { Pollyx } from './core/Pollyx';
export { DiffEngine } from './core/DiffEngine';
export { WebSocketManager } from './core/WebSocketManager';
export { RetryStrategy } from './core/RetryStrategy';

// Adapters
export { usePolling } from './adapters/react';
export { usePollingVue } from './adapters/vue';

// Utils
export { Logger } from './utils/logger';
export { version } from '../package.json';

// Default export
import { Pollyx } from './core/Pollyx';
export default Pollyx;