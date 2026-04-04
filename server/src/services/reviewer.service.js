import axios from "axios";
import config from "../config/config.js";
import logger from "../utils/logger.js";

/**
 * Claude ko prompt bhejta hai aur review wapas leta hai
 * @param {string} formattedDiff - parser se aaya clean diff
 * @param {string} prTitle - PR ka title (context ke liye)
 * @returns {Promise<string>} - Claude ka markdown review
 */
export const reviewCode = async (formattedDiff, prTitle = "") => {
  try {
    logger.info("Sending diff to Claude for review...");

    const systemPrompt = `You are an expert code reviewer with 10+ years of experience.
Your job is to review git diffs and provide clear, actionable, and constructive feedback.

Always respond in this exact markdown format:

## 🤖 AI Code Review

### 📋 Summary
Brief 2-3 line overview of what this PR does.

### 🐛 Bugs & Issues
List any bugs, logic errors, or broken code. If none, write "No bugs found."

### 🔒 Security Concerns
List any security vulnerabilities (XSS, SQL injection, exposed secrets, etc). If none, write "No security issues found."

### ⚠️ Warnings
List code smells, bad practices, or things that could cause future problems.

### ✅ Suggestions
List improvements with code examples where helpful.

### 📊 Code Quality Score
Rate the code X/10 and give one line reason.

Be direct and specific. Always reference the filename when pointing out issues.`;

    const userPrompt = `Please review the following pull request.

PR Title: ${prTitle || "No title provided"}

Changes:
${formattedDiff}`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: config.anthropic.model,
        max_tokens: config.anthropic.maxTokens,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      },
      {
        headers: {
          "x-api-key": config.anthropic.apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
      }
    );

    // Response validate karo
    if (
      !response.data ||
      !response.data.content ||
      !response.data.content[0]?.text
    ) {
      throw new Error("Invalid response structure from Claude API");
    }

    const review = response.data.content[0].text;
    logger.info("Claude review received successfully");

    return review;

  } catch (err) {
    // Anthropic API specific errors
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.error?.message || "Unknown API error";

      if (status === 401) {
        throw new Error("Invalid Anthropic API key");
      }
      if (status === 429) {
        throw new Error("Anthropic rate limit hit — try again later");
      }
      if (status === 400) {
        throw new Error(`Bad request to Claude API: ${message}`);
      }

      throw new Error(`Claude API error (${status}): ${message}`);
    }

    logger.error("Failed to get review from Claude:", err);
    throw new Error(`Reviewer service failed: ${err.message}`);
  }
};