# Project Documentation

Welcome to the project documentation! Use the links below to navigate to the section you're interested in:

## Table of Contents

- [Installation](installation.md)
- [Usage](usage.md)
- [Functions](functions/overview.md)
- [API Overview](api/overview.md)
- [API Endpoints](api/endpoints.md)


## REPO

CHATBOT-CLIENT-MANAGEMENT-V1.1/
│
├── app/
│   ├── favicon.ico           # Site favicon
│   ├── globals.css           # Global CSS styles
│   ├── layout.tsx            # Layout component
│   └── page.tsx              # Main page component (probably root route)
│
├── docs/
│   ├── api/
│   │   ├── endpoints.md      # Documentation for API endpoints
│   │   └── overview.md       # General overview of the API
│   │
│   ├── functions/
│       ├── overview.md       # Overview of functions in the app
│       ├── index.md          # Index of functions
│       ├── installation.md   # Installation instructions
│       └── usage.md          # Usage guide
│
├── node_modules/             # Installed npm modules
│
├── public/
│   ├── next.svg              # Next.js logo or related asset
│   └── vercel.svg            # Vercel logo or related asset
│
├── .env                      # Environment variables file
├── .gitignore                # Git ignore rules
├── management.env            # Environment file for management-specific settings
├── next.config.mjs           # Next.js configuration file
├── package-lock.json         # Lockfile for npm dependencies
├── package.json              # Project dependencies and scripts
├── pnpm-lock.yaml            # Lockfile for pnpm dependencies
├── postcss.config.mjs        # PostCSS configuration file
├── README.md                 # Project overview and setup instructions
├── tailwind.config.ts        # Tailwind CSS configuration file
└── tsconfig.json             # TypeScript configuration file


REPOSITORY/
│
├── public/
│   ├── favicon.ico           # Site favicon
│   └── vercel.svg            # Vercel logo or related asset
│
├── src/
│   ├── @types/
│   │   ├── index.d.ts        # TypeScript definitions
│   │   └── next.interface.ts # Interface definitions for Next.js
│   │
│   ├── lib/
│   │   ├── customSessionCli3.ts # Custom session handling
│   │   ├── sessionStorage.ts    # Session storage logic
│   │   ├── shopify.ts           # Shopify-related utilities
│   │   └── shopifyCli.mjs       # Shopify CLI utilities
│   │
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── callback.ts        # Auth callback handling
│   │   │   │   ├── index.ts           # Auth index or default handling
│   │   │   │   ├── offline-callback.ts # Offline callback handling
│   │   │   │   └── offline.ts         # Offline mode handling
│   │   │   │
│   │   │   ├── webhooks/
│   │   │   │   ├── [...webhookTopic].ts # Dynamic webhook topic handling
│   │   │   │   ├── graphql.ts           # GraphQL API handling
│   │   │   │   └── hello.ts             # Example or testing API route
│   │
│   ├── app/
│   │   ├── _app.tsx           # Custom App component for Next.js
│   │   ├── _middleware.tsx    # Middleware handling for the app
│   │   ├── index.tsx          # Main index page
│   │   └── login.tsx          # Login page component
│   │
│   ├── styles/
│
├── webhooks/
│   ├── app_uninstalled.ts     # Webhook for app uninstallation
│   └── index.ts               # Webhook entry point or handling
│
├── .env                       # Environment variables file
├── .eslintrc.json             # ESLint configuration file
├── .gitignore                 # Git ignore rules
├── next-env.d.ts              # Next.js environment declarations
├── next.config.mjs            # Next.js configuration file
├── ngrok-v3-stable-linux-amd64.tgz # Ngrok installation package
├── package-lock.json          # Lockfile for npm dependencies
├── package.json               # Project dependencies and scripts
├── pnpm-lock.yaml             # Lockfile for pnpm dependencies
├── README.md                  # Project overview and setup instructions
├── shopify.app.toml           # Shopify app configuration file
└── tsconfig.json              # TypeScript configuration file
