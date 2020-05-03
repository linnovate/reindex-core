const winston = require("winston");
const { format, transports, createLogger } = winston;

const modelFormat = format.printf(
  ({ message, label, level, timestamp }) =>
    `[${timestamp} | ${level} | ${label}] : ${message}`
);

const calulcatedLevel = process.env.NODE_ENV == "production" ? "info" : "debug";

// Logger Setup
const Logger = createLogger({
  transports: [
    new transports.Console({
      level: calulcatedLevel,
      format: format.combine(
        format.label({ label: process.env.SERVICE_NAME }),
        format.colorize(),
        format.timestamp(),
        modelFormat
      )
    })
  ]
});
console.debug = function() {
  Logger.debug.apply(Logger, arguments);
};

console.log = function() {
  Logger.info.apply(Logger, arguments);
};
console.warn = function() {
  Logger.warn.apply(Logger, arguments);
};
console.error = function() {
  Logger.error.apply(Logger, arguments);
};

module.exports = Logger;
