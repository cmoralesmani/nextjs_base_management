const { publicRuntimeConfig } = require("next.config");

/**
 * API configuration
 */
export const BASE_URL = `${publicRuntimeConfig.apiUrl}`;

/**
 * WebSocket configuration
 */
export const WS_URL = `${publicRuntimeConfig.wsUrl}`;
