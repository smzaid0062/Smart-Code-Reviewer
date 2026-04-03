import crypto from "crypto";
import logger from "../utils/logger.js";
import config from "../config/config.js";

const validateWebhook = (req, res, next) => {
  try {
    const signature = req.headers["x-hub-signature-256"];

    if (!signature) {
      logger.warn("Webhook received without signature");
      return res.status(401).json({ error: "Missing webhook signature" });
    }

    const hmac = crypto.createHmac("sha256", config.github.webhookSecret);
    const digest = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");

    const trusted = Buffer.from(digest, "utf8");
    const received = Buffer.from(signature, "utf8");

    if (
      trusted.length !== received.length ||
      !crypto.timingSafeEqual(trusted, received)
    ) {
      logger.warn("Invalid webhook signature — possible spoofed request");
      return res.status(401).json({ error: "Invalid webhook signature" });
    }

    next();
  } catch (err) {
    logger.error("Error validating webhook signature:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default validateWebhook;