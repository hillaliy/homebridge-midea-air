"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceColor = exports.setTimestampEnabled = exports.setDebugEnabled = exports.withPrefix = exports.Logger = exports.LogLevel = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const util_1 = __importDefault(require("util"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Log levels to indicate importance of the logged message.
 * Every level corresponds to a certain color.
 *
 * - INFO: no color
 * - WARN: yellow
 * - ERROR: red
 * - DEBUG: gray
 *
 * Messages with DEBUG level are only displayed if explicitly enabled.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
    LogLevel["DEBUG"] = "debug";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * Logger class
 */
class Logger {
    constructor(prefix) {
        this.prefix = prefix;
    }
    /**
     * Creates a new Logging device with a specified prefix.
     *
     * @param prefix {string} - the prefix of the logger
     */
    static withPrefix(prefix) {
        const loggerStuff = Logger.loggerCache.get(prefix);
        if (loggerStuff) {
            return loggerStuff;
        }
        else {
            const logger = new Logger(prefix);
            const log = logger.info.bind(logger);
            log.info = logger.info;
            log.warn = logger.warn;
            log.error = logger.error;
            log.debug = logger.debug;
            log.log = logger.log;
            log.prefix = logger.prefix;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const logging = log; // i aimed to not use ts-ignore in this project, but this evil "thing" above is hell
            Logger.loggerCache.set(prefix, logging);
            return logging;
        }
    }
    /**
     * Turns on debug level logging. Off by default.
     *
     * @param enabled {boolean}
     */
    static setDebugEnabled(enabled = true) {
        Logger.debugEnabled = enabled;
    }
    /**
     * Turns on inclusion of timestamps in log messages. On by default.
     *
     * @param enabled {boolean}
     */
    static setTimestampEnabled(enabled = true) {
        Logger.timestampEnabled = enabled;
    }
    /**
     * Forces color in logging output, even if it seems like color is unsupported.
     */
    static forceColor() {
        chalk_1.default.level = 1; // `1` - Basic 16 colors support.
    }
    info(message, ...parameters) {
        this.log("info" /* INFO */, message, ...parameters);
    }
    warn(message, ...parameters) {
        this.log("warn" /* WARN */, message, ...parameters);
    }
    error(message, ...parameters) {
        this.log("error" /* ERROR */, message, ...parameters);
    }
    debug(message, ...parameters) {
        if (Logger.debugEnabled) {
            this.log("debug" /* DEBUG */, message, ...parameters);
        }
    }
    log(level, message, ...parameters) {
        message = util_1.default.format(message, ...parameters);
        let loggingFunction = console.log;
        switch (level) {
            case "warn" /* WARN */:
                message = chalk_1.default.yellow(message);
                loggingFunction = console.error;
                break;
            case "error" /* ERROR */:
                message = chalk_1.default.red(message);
                loggingFunction = console.error;
                break;
            case "debug" /* DEBUG */:
                message = chalk_1.default.gray(message);
                break;
        }
        if (this.prefix) {
            message = chalk_1.default.cyan(`[${this.prefix}] `) + message;
        }
        if (Logger.timestampEnabled) {
            const date = new Date();
            message = chalk_1.default.white(`[${date.toLocaleString()}] `) + message;
        }
        loggingFunction(message);
    }
}
exports.Logger = Logger;
Logger.internal = new Logger();
Logger.loggerCache = new Map(); // global cache of logger instances by plugin name
Logger.debugEnabled = false;
Logger.timestampEnabled = true;
/**
 * Creates a new Logging device with a specified prefix.
 *
 * @param prefix {string} - the prefix of the logger
 * @deprecated please use {@link Logger.withPrefix} directly
 */
function withPrefix(prefix) {
    return Logger.withPrefix(prefix);
}
exports.withPrefix = withPrefix;
/**
 * Turns on debug level logging. Off by default.
 *
 * @param enabled {boolean}
 * @deprecated please use {@link Logger.setDebugEnabled} directly
 */
function setDebugEnabled(enabled = true) {
    Logger.setDebugEnabled(enabled);
}
exports.setDebugEnabled = setDebugEnabled;
/**
 * Turns on inclusion of timestamps in log messages. On by default.
 *
 * @param enabled {boolean}
 * @deprecated please use {@link Logger.setTimestampEnabled} directly
 */
function setTimestampEnabled(enabled = true) {
    Logger.setTimestampEnabled(enabled);
}
exports.setTimestampEnabled = setTimestampEnabled;
/**
 * Forces color in logging output, even if it seems like color is unsupported.
 *
 * @deprecated please use {@link Logger.forceColor} directly
 */
function forceColor() {
    chalk_1.default.level = 1; // `1` - Basic 16 colors support.
}
exports.forceColor = forceColor;
//# sourceMappingURL=logger.js.map