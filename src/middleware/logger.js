const morgan = require("morgan");

const devFormat =
  ":method :url :status :response-time ms - :res[content-length]";

const logger = morgan(
  process.env.NODE_ENV === "production" ? "combined" : devFormat
);

module.exports = logger;
