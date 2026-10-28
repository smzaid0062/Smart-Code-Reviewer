import dotenv from "dotenv";
import app from "./src/app.js";
import config from "./src/config/config.js";
import logger from "./src/utils/logger.js";

const PORT = config.port;
dotenv.config();

app.get('/health', (req, res) => res.status(200).send('ok'));

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT} in ${config.env} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});