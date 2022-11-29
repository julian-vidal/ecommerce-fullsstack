
/*
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});


const logger = createLogger({
    format: combine(
      timestamp(),
      colorize(),
      myFormat
    ),
    transports: [new transports.Console({level: "info"})]
  });

*/

const winston = require("winston")

const {format} = winston

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            level: "info",
            format: format.combine(
                format.colorize(),
                format.simple(),
                format.timestamp(),
              )
        }),
        new winston.transports.File({
            filename: "error.log",
            level: "error"
        }),
        new winston.transports.File({
          filename: "warning.log",
          level: "warning"
        })

    ]
})

module.exports = logger

