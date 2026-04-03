import "dotenv/config";

/**
 * Central configuration module.
 * Validates all required environment variables at startup.
 * Throws immediately if any are missing — fail fast principle.
 */

const requiredEnvVars = [
  "GITHUB_WEBHOOK_SECRET",
  "GITHUB_TOKEN",
  "ANTHROPIC_API_KEY",
];

// Fail fast — crash on startup if any required env var is missing
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables:\n${missingVars
      .map((v) => `  - ${v}`)
      .join("\n")}\n\nCheck your .env file against .env.example`
  );
}

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 3000,

  github: {
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
    token: process.env.GITHUB_TOKEN,
  },

  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: "claude-sonnet-4-20250514",
    maxTokens: 1500,
  },

  rateLimit: {
    windowMs: 60 * 1000,
    max: 60,
  },
};

export default config;