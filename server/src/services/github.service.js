import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import config from "../config/config.js";
import logger from "../utils/logger.js";

/**
 * GitHub App ke liye authenticated Octokit instance banata hai
 * Har installation ke liye alag token generate hota hai
 * @param {number} installationId - GitHub App installation ID
 * @returns {Octokit} - Authenticated Octokit instance
 */
const getInstallationOctokit = (installationId) => {
  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: config.github.appId,
      privateKey: config.github.privateKey,
      installationId,
    },
  });
};

/**
 * Fetch the diff of a pull request
 * @param {string} owner - Repo owner username
 * @param {string} repo - Repo name
 * @param {number} pullNumber - PR number
 * @param {number} installationId - GitHub App installation ID
 * @returns {Promise<string>} - Raw diff string
 */
export const fetchPullRequestDiff = async (
  owner,
  repo,
  pullNumber,
  installationId
) => {
  try {
    logger.info(`Fetching diff for PR #${pullNumber} in ${owner}/${repo}`);

    const octokit = getInstallationOctokit(installationId);

    const response = await octokit.pulls.get({
      owner,
      repo,
      pull_number: pullNumber,
      mediaType: {
        format: "diff",
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
 * @param {number} installationId - GitHub App installation ID
 * @returns {Promise<void>}
 */
export const postReviewComment = async (
  owner,
  repo,
  pullNumber,
  body,
  installationId
) => {
  try {
    logger.info(
      `Posting review comment on PR #${pullNumber} in ${owner}/${repo}`
    );

    const octokit = getInstallationOctokit(installationId);

    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pullNumber,
      body,
    });

    logger.info(`Review comment posted successfully on PR #${pullNumber}`);

  } catch (err) {
    logger.error(`Failed to post comment on PR #${pullNumber}:`, err);
    throw new Error(`GitHub comment post failed: ${err.message}`);
  }
};