import winston from "winston";

const safeStringify = (obj: unknown): string => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return "Error in metadata serialization";
  }
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.printf(
      ({
        timestamp,
        level,
        message,
        ...meta
      }: {
        timestamp: string;
        level: string;
        message: string;
        [key: string]: unknown;
      }) => {
        const metaString = Object.keys(meta).length ? safeStringify(meta) : "";
        return `${timestamp} [${level}]: ${message} ${metaString}`;
      }
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

export default logger;
