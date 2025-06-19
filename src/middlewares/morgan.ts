import morgan, { StreamOptions } from "morgan";
import logger from "../config/logger";

const stream: StreamOptions = {
    write: (message) => logger.http(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

const morganMiddleware = morgan(
    ":method endpoint::url status::status response-time::response-time ms",
    { stream, skip }
);

export default morganMiddleware;