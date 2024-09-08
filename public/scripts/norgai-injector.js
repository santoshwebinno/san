console.log('norgai-injector.js loaded');

// Initialize window.norgai
window.norgai = window.norgai || {};
window.norgai.chatboost = {
    mode: 'chat',
    secret_key: 'your_secret_key_here',
    environment: 'dev'
};

console.log('window.norgai initialized:', window.norgai);

// Inject the CSS
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://norgcdnstorage.blob.core.windows.net/norgcdn-container/plugin-dev/css/main.min.css?192847';
document.head.appendChild(link);
console.log('CSS injected');

// Create the root div for the app
const rootDiv = document.createElement('div');
rootDiv.id = 'react-root-magento';
document.body.appendChild(rootDiv);
console.log('Root div created');

// Include the main JS file
const script = document.createElement('script');
script.src = 'https://norgcdnstorage.blob.core.windows.net/norgcdn-container/plugin-dev/js/main.min.js?750742';
document.body.appendChild(script);
console.log('Main JS injected');
