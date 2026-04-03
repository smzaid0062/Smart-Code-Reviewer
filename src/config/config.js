// const requiredEnvVars = [
//   "GITHUB_WEBHOOK_SECRET",
//   "GITHUB_TOKEN",
//   "ANTHROPIC_API_KEY",
// ];

// requiredEnvVars.forEach((key) => {
//   if (!process.env[key]) {
//     throw new Error(`Missing required environment variable: ${key}`);
//   }
// });

// const config = {
//   env: process.env.NODE_ENV || "development",
//   port: process.env.PORT || 3000,
//   github: {
//     webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
//     token: process.env.GITHUB_TOKEN,
//   },
//   anthropic: {
//     apiKey: process.env.ANTHROPIC_API_KEY,
//   },
// };

// export default config;


const config = {
  port: 3000,
};

export default config;