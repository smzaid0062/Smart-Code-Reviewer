import { Octokit } from "@octokit/rest";
import config from "../config/config.js";
import logger from "../utils/logger.js";

// Initialize Octokit with GitHub token
const octokit = new Octokit({
  auth: config.github.token,
});

/**
 * Fetch the diff of a pull request
 * @param {string} owner - Repo owner username
 * @param {string} repo - Repo name
 * @param {number} pullNumber - PR number
 * @returns {Promise<string>} - Raw diff string
 */
export const fetchPullRequestDiff = async (owner, repo, pullNumber) => {
  try {
    logger.info(`Fetching diff for PR #${pullNumber} in ${owner}/${repo}`);

    const response = await octokit.pulls.get({
      owner,
      repo,
      pull_number: pullNumber,
      mediaType: {
        format: "diff", // tells GitHub to return raw diff
      },
    });

    if (!response.data) {
      throw new Error("Empty diff received from GitHub");
    }

    logger.info(`Diff fetched successfully for PR #${pullNumber}`);
    return response.data;

  } catch (err) {
    logger.error(`Failed to fetch diff for PR #${pullNumber}:`, err);
    throw new Error(`GitHub diff fetch failed: ${err.message}`);
  }
};

/**
 * Post a review comment on a pull request
 * @param {string} owner - Repo owner username
 * @param {string} repo - Repo name
 * @param {number} pullNumber - PR number
 * @param {string} body - Comment body (markdown supported)
 * @returns {Promise<void>}
 */
export const postReviewComment = async (owner, repo, pullNumber, body) => {
  try {
    logger.info(`Posting review comment on PR #${pullNumber} in ${owner}/${repo}`);

    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pullNumber, // PRs are issues in GitHub API
      body,
    });

    logger.info(`Review comment posted successfully on PR #${pullNumber}`);

  } catch (err) {
    logger.error(`Failed to post comment on PR #${pullNumber}:`, err);
    throw new Error(`GitHub comment post failed: ${err.message}`);
  }
};