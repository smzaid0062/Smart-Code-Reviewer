import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "GITHUB_WEBHOOK_SECRET",
  "GITHUB_TOKEN",
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
    token: process.env.GITHUB_TOKEN,
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