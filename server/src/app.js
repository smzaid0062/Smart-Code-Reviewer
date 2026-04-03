import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import handleWebhook from "./controllers/webhook.controller.js";
import validateWebhook from "./middlewares/validateWebhook.js";
import logger from "./utils/logger.js";

const app = express();

// Security headers
app.use(helmet());
app.set("trust proxy", 1);

// Rate limiting — max 60 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Webhook route
app.post("/webhook", validateWebhook, handleWebhook);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

export default app;