import dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();

const requiredEnvVars = [
  "GITHUB_WEBHOOK_SECRET",
  "GITHUB_APP_ID",
  "GITHUB_APP_CLIENT_ID",
  "GITHUB_PRIVATE_KEY",
  "GROQ_API_KEY",
];

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
    appId: process.env.GITHUB_APP_ID,
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    // Handle both \n string and actual newlines
    privateKey: process.env.GITHUB_PRIVATE_KEY
      .replace(/\\n/g, "\n")
      .replace(/["']/g, "")
      .trim(),
  },

  groq: {
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    maxTokens: 1500,
  },

  rateLimit: {
    windowMs: 60 * 1000,
    max: 60,
  },
};

export default config;