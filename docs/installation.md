# Installation Guide

## For running with ngrok
## 1
ngrok http 3000
pause
(this need to run continuously in different terminal don't close it every time we run ngrok we get new URL)
get url from ngrok
add url in HOST="https://b5e1-203-220-141-137.ngrok-free.app"
add url in shopify partner (https://partners.shopify.com/3846470) and in shopify.app.toml under redirect urls (in shopify app you can see under app > ai-sales-companion > configuration)
"https://b5e1-203-220-141-137.ngrok-free.app/auth/callback",
"https://b5e1-203-220-141-137.ngrok-free.app/auth/shopify/callback",
"https://b5e1-203-220-141-137.ngrok-free.app/api/auth/callback",
"https://b5e1-203-220-141-137.ngrok-free.app/api/auth/offline-callback"

## 2
npm install

## 3
npm install -g @shopify/cli @shopify/theme (if not already installed)

## 4
add .env
add shopify.app.toml

## 5
npm run shopify app config link

Before proceeding, your project needs to be associated with an app.

?  Create this project as a new app on Shopify?
✔  No, connect it to an existing app

?  Which existing app is this for?
✔  ai-shop-assisstant (shopify.app.toml)


npm run shopify app deploy
## 6 
comment SHOPIFY_APP_URL: config.application_url, in next.config.mjs
npm run dev

## 7
use https://b5e1-203-220-141-137.ngrok-free.app to access site


## SHOPIFY CLI

## 1
npm run shopify-dev