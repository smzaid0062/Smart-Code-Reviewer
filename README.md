# folder structure

smart-code-reviewer/
├── src/                        # All source code lives here
│   ├── config/
│   │   └── index.js            # All env vars validated & exported
│   ├── controllers/
│   │   └── webhook.controller.js   # Handles incoming webhook logic
│   ├── services/
│   │   ├── github.service.js   # All GitHub API calls
│   │   └── reviewer.service.js # Claude API integration
│   ├── utils/
│   │   ├── logger.js           # Winston logger
│   │   └── parser.js           # Diff parsing helpers
│   ├── middlewares/
│   │   └── validateWebhook.js  # GitHub signature verification
│   └── app.js                  # Express app setup
├── server.js                   # Entry point (starts the server)
├── .env                        # Secret keys (never commit)
├── .env.example                # Template showing what keys are needed
├── .gitignore
├── package.json
└── README.md


#----------------------------------------------
npm install winston express-rate-limit helmet

Package         -> Purpose 
winston         -> Professional logging (not just console.log)
helmet          -> Security headers for Expressexpress-rate-limit -> Prevent webhook abuse