import axios from "axios";
import config from "../config/config.js";
import logger from "../utils/logger.js";

/**
 * Groq API ko prompt bhejta hai aur review wapas leta hai
 * @param {string} formattedDiff - parser se aaya clean diff
 * @param {string} prTitle - PR ka title (context ke liye)
 * @returns {Promise<string>} - markdown review
 */
export const reviewCode = async (formattedDiff, prTitle = "") => {
  try {
    logger.info("Sending diff to Groq (Llama 3.3 70B) for review...");

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

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: config.groq.model,
        max_tokens: config.groq.maxTokens,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Please review the following pull request.\n\nPR Title: ${prTitle || "No title provided"}\n\nChanges:\n${formattedDiff}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${config.groq.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Response validate karo
    if (
      !response.data ||
      !response.data.choices ||
      !response.data.choices[0]?.message?.content
    ) {
      throw new Error("Invalid response structure from Groq API");
    }

    const review = response.data.choices[0].message.content;
    logger.info("Groq review received successfully");

    return review;

  } catch (err) {
    // Groq API specific errors
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.error?.message || "Unknown API error";

      if (status === 401) {
        throw new Error("Invalid Groq API key");
      }
      if (status === 429) {
        throw new Error("Groq rate limit hit — try again later");
      }
      if (status === 400) {
        throw new Error(`Bad request to Groq API: ${message}`);
      }

      throw new Error(`Groq API error (${status}): ${message}`);
    }

    logger.error("Failed to get review from Groq:", err);
    throw new Error(`Reviewer service failed: ${err.message}`);
  }
};