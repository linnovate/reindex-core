const { format, createLogger, transports } = require("winston");

const shardFormat = format.printf(({ level, message, label, timestamp }) => {
    return `[${timestamp} / ${level} / ${label.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    level: "info",
    defaultMeta: { serviceName: process.env.SERVICE_NAME },
    transports: [
        new transports.Console({
            format: format.combine(
                format.label({ label: process.env.SERVICE_NAME }),
                format.timestamp(),
                format.colorize(),
                shardFormat
            ),
        }),
    ],
});

console.log = function () {
    return logger.info.apply(logger, arguments);
};
console.info = function () {
    return logger.info.apply(logger, arguments);
};
console.warn = function () {
    return logger.warn.apply(logger, arguments);
};
console.error = function () {
    return logger.error.apply(logger, arguments);
};

module.exports.logger = logger;
