import logger from "../utils/logger.js";
import { fetchPullRequestDiff, postReviewComment } from "../services/github.service.js";
import { parseDiff, formatDiffForReview } from "../utils/parser.js";
import { reviewCode } from "../services/reviewer.service.js";

/**
 * Sirf yeh PR actions pe review trigger hoga
 * "synchronize" matlab new commit push hua PR mein
 */
const TRIGGER_ACTIONS = ["opened", "synchronize", "reopened"];

/**
 * Main webhook handler
 * GitHub se aane wale saare events yahan aate hain
 */
export const handleWebhook = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const payload = req.body;

    logger.info(`Received GitHub event: ${event}`);

    // Sirf ping event ka response
    if (event === "ping") {
      return res.status(200).json({ message: "Webhook connected successfully!" });
    }

    // Sirf pull_request events handle karo
    if (event !== "pull_request") {
      logger.info(`Event '${event}' is not handled — skipping`);
      return res.status(200).json({ message: "Event received but not handled" });
    }

    const action = payload.action;
    const pr = payload.pull_request;
    const repo = payload.repository;

    // Sirf relevant actions pe review karo
    if (!TRIGGER_ACTIONS.includes(action)) {
      logger.info(`PR action '${action}' does not trigger review — skipping`);
      return res.status(200).json({ message: `PR action '${action}' skipped` });
    }

    const owner = repo.owner.login;
    const repoName = repo.name;
    const pullNumber = pr.number;
    const prTitle = pr.title;

    logger.info(`Starting review for PR #${pullNumber} — "${prTitle}"`);

    // GitHub ko turant 200 bhejo — review background mein hoga
    // Warna GitHub timeout kar deta hai
    res.status(200).json({ message: "Review started" });

    // Background mein poora review flow chalaao
    await runReviewFlow({ owner, repoName, pullNumber, prTitle });

  } catch (err) {
    logger.error("Webhook handler error:", err);

    // Agar response abhi tak nahi gaya toh bhejo
    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to process webhook" });
    }
  }
};

/**
 * Poora review flow — diff fetch, parse, review, comment
 * @param {object} params
 */
const runReviewFlow = async ({ owner, repoName, pullNumber, prTitle }) => {
  try {
    // Step 1 — GitHub se diff fetch karo
    const rawDiff = await fetchPullRequestDiff(owner, repoName, pullNumber);

    // Step 2 — Diff parse aur clean karo
    const parsedFiles = parseDiff(rawDiff);
    const formattedDiff = formatDiffForReview(parsedFiles);

    logger.info(`Parsed ${parsedFiles.length} files for PR #${pullNumber}`);

    // Step 3 — Claude se review lo
    const review = await reviewCode(formattedDiff, prTitle);

    // Step 4 — Review PR pe comment karo
    await postReviewComment(owner, repoName, pullNumber, review);

    logger.info(`✅ Review complete for PR #${pullNumber}`);

  } catch (err) {
    logger.error(`Review flow failed for PR #${pullNumber}:`, err);

    // Error bhi PR pe comment karo taaki developer ko pata chale
    try {
      await postReviewComment(
        owner,
        repoName,
        pullNumber,
        `## 🤖 AI Code Review\n\n❌ Review failed: ${err.message}\n\nPlease check the server logs for more details.`
      );
    } catch (commentErr) {
      logger.error("Failed to post error comment on PR:", commentErr);
    }
  }
};