import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { parse } from '@iarna/toml';

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the shopify.app.toml file
const shopifyAppTomlPath = path.resolve(__dirname, 'shopify.app.toml');
const config = parse(fs.readFileSync(shopifyAppTomlPath, 'utf-8'));

// Uncomment these imports if you plan to use them
// import * as envfile from 'envfile';
// import * as ngrok from 'ngrok';
// import { output, session } from '@shopify/cli-kit';
// import cli from './src/lib/shopifyCli.mjs';
// import { readFile, writeFileSync } from 'fs';

const nextConfig = async (phase) => {
  // let SHOPIFY_APP_URL = process.env.SHOPIFY_APP_URL;

  // Uncomment this section if you want to use ngrok for tunneling in the development phase
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   HOST = await setEnvironmentAndReturnHost();
  // }

  return {
    reactStrictMode: true,
    swcMinify: true, // Enable SWC-based minification
    env: {
    // SHOPIFY_APP_URL: config.application_url, // comment this when using ngrok in development
  },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/main',
          permanent: true,
        },
      ];
    },
      };
};

export default nextConfig;

// Function to write environment variables to the .env file
// const writeEnvToFile = (envVariables) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   const envPath = path.resolve(__dirname, '.env');
//   readFile(envPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     const parsedFile = envfile.parse(data);
//     envVariables.forEach((envVar) => {
//       if (envVar.key && envVar.value) {
//         parsedFile[envVar.key] = envVar.value;
//       }
//     });
//     writeFileSync(envPath, envfile.stringify(parsedFile));
//   });
// };

// Function to set environment and return the host URL
// async function setEnvironmentAndReturnHost() {
//   const token = await session.ensureAuthenticatedPartners();
//   const orgId = await cli.selectOrg(token);
//   const app = await cli.fetchAppFromApiKey(process.env.SHOPIFY_API_KEY, token);
//   const store = cli.removeHttp(process.env.SHOP);

//   const tunnelUrl = await ngrok.connect({
//     addr: 3000,
//     authtoken: process.env.NGROK_AUTH_TOKEN,
//   });

//   if (tunnelUrl) {
//     writeEnvToFile([{ key: "HOST", value: tunnelUrl }]);
//     output.info(output.content`\n\nNgrok tunnel is running\n`);
//     await cli.updateURLs(app.apiKey, tunnelUrl);
//     cli.outputAppURL(true, store, tunnelUrl);
//   }

//   return tunnelUrl;
// }
