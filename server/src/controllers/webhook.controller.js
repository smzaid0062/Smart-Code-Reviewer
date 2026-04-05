import logger from "../utils/logger.js";
import {
  fetchPullRequestDiff,
  postReviewComment,
} from "../services/github.service.js";
import { parseDiff, formatDiffForReview } from "../utils/parser.js";
import { reviewCode } from "../services/reviewer.service.js";

const TRIGGER_ACTIONS = ["opened", "synchronize", "reopened"];

export const handleWebhook = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    logger.info(`Received GitHub event: ${event}`);

    if (event === "ping") {
      return res
        .status(200)
        .json({ message: "Webhook connected successfully!" });
    }

    if (event !== "pull_request") {
      logger.info(`Event '${event}' is not handled — skipping`);
      return res
        .status(200)
        .json({ message: "Event received but not handled" });
    }

    const action = payload.action;
    const pr = payload.pull_request;
    const repo = payload.repository;

    // GitHub App installation ID — payload se aata hai
    const installationId = payload.installation?.id;

    if (!installationId) {
      logger.warn("No installation ID found in payload — skipping");
      return res.status(200).json({ message: "No installation ID found" });
    }

    if (!TRIGGER_ACTIONS.includes(action)) {
      logger.info(`PR action '${action}' does not trigger review — skipping`);
      return res
        .status(200)
        .json({ message: `PR action '${action}' skipped` });
    }

    const owner = repo.owner.login;
    const repoName = repo.name;
    const pullNumber = pr.number;
    const prTitle = pr.title;

    logger.info(`Starting review for PR #${pullNumber} — "${prTitle}"`);

    // GitHub ko turant 200 bhejo
    res.status(200).json({ message: "Review started" });

    // Background mein review flow chalaao
    await runReviewFlow({
      owner,
      repoName,
      pullNumber,
      prTitle,
      installationId,
    });

  } catch (err) {
    logger.error("Webhook handler error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to process webhook" });
    }
  }
};

const runReviewFlow = async ({
  owner,
  repoName,
  pullNumber,
  prTitle,
  installationId,
}) => {
  try {
    // Step 1 — Diff fetch karo
    const rawDiff = await fetchPullRequestDiff(
      owner,
      repoName,
      pullNumber,
      installationId
    );

    // Step 2 — Diff parse karo
    const parsedFiles = parseDiff(rawDiff);
    const formattedDiff = formatDiffForReview(parsedFiles);

    logger.info(`Parsed ${parsedFiles.length} files for PR #${pullNumber}`);

    // Step 3 — Claude se review lo
    const review = await reviewCode(formattedDiff, prTitle);

    // Step 4 — PR pe comment karo
    await postReviewComment(
      owner,
      repoName,
      pullNumber,
      review,
      installationId
    );

    logger.info(`✅ Review complete for PR #${pullNumber}`);

  } catch (err) {
    logger.error(`Review flow failed for PR #${pullNumber}:`, err);

    try {
      await postReviewComment(
        owner,
        repoName,
        pullNumber,
        `## 🤖 AI Code Review\n\n❌ Review failed: ${err.message}\n\nPlease check the server logs.`,
        installationId
      );
    } catch (commentErr) {
      logger.error("Failed to post error comment on PR:", commentErr);
    }
  }
};