import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/common/EnvVars";
import server from "./server";
import connectDB from "./db";

// **** Run **** //
if (EnvVars.Mongo.ConnectionString) {
  connectDB(EnvVars.Mongo.ConnectionString);
} else {
  logger.info("MongoDB connection string was not provided.");
}

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
