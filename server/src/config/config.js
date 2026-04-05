import dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();

const requiredEnvVars = [
  "GITHUB_WEBHOOK_SECRET",
  "GITHUB_APP_ID",
  "GITHUB_APP_CLIENT_ID",
  "GITHUB_PRIVATE_KEY_PATH",
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

// Private key file read karo
let privateKey;
try {
  privateKey = readFileSync(process.env.GITHUB_PRIVATE_KEY_PATH, "utf8");
} catch (err) {
  throw new Error(
    `Failed to read private key from: ${process.env.GITHUB_PRIVATE_KEY_PATH}\nMake sure private-key.pem exists in your project root.`
  );
}

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 3000,

  github: {
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
    token: process.env.GITHUB_TOKEN,
    appId: process.env.GITHUB_APP_ID,
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    privateKey,
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