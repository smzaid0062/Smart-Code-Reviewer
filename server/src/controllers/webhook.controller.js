import logger from "../utils/logger.js";

const handleWebhook = (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    logger.info(`Received GitHub event: ${event}`);

    if (event === "ping") {
      return res.status(200).json({ message: "Webhook connected successfully!" });
    }

    if (event === "pull_request") {
      const action = payload.action;
      logger.info(`PR action: ${action} — PR #${payload.pull_request?.number}`);

      // We'll add review logic here in Week 2
      return res.status(200).json({ message: `PR event received: ${action}` });
    }

    logger.info(`Event '${event}' received but not handled`);
    return res.status(200).json({ message: "Event received but not handled" });

  } catch (err) {
    logger.error("Error handling webhook:", err);
    return res.status(500).json({ error: "Failed to process webhook" });
  }
};

export default handleWebhook ;