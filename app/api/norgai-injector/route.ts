// import { NextResponse } from 'next/server';

// export async function GET() {
//   // Define your JavaScript content dynamically here
//   const scriptContent = `
//     console.log('norgai-injector.js loaded');

//     // Initialize window.norgai
//     window.norgai = window.norgai || {};
//     window.norgai.chatboost = {
//       mode: 'chat',
//       secret_key: 'your_secret_key_here',
//       environment: 'dev',
//       layout: {
//         chatbot_position: 'Bubble'
//       }
//     };

//     console.log('window.norgai initialized:', window.norgai);

//     // Check if the CSS is already injected
//     if (!document.querySelector('link[href="https://norgcdnstorage.blob.core.windows.net/norgcdn-container/plugin-dev/css/main.min.css?192847"]')) {
//       // Inject the CSS
//       const cssLink = document.createElement('link');
//       cssLink.rel = 'stylesheet';
//       cssLink.href = 'https://norgcdnstorage.blob.core.windows.net/norgcdn-container/plugin-dev/css/main.min.css?192847';
//       document.head.appendChild(cssLink);
//       console.log('CSS injected');
//     } else {
//       console.log('CSS already injected');
//     }

//     // Check if the root div already exists
//     // if (!document.getElementById('react-root-magento')) {
//     //   // Create the root div for the app with styling
//     //   const rootDiv = document.createElement('div');
//     //   rootDiv.id = 'react-root-magento';
//     //   rootDiv.style.position = 'absolute';
//     //   rootDiv.style.right = '20px';  // Customize the position as needed
//     //   rootDiv.style.bottom = '20px'; // Customize the position as needed
//     //   rootDiv.style.zIndex = '50';   // Ensure it's on top
//     //   document.body.appendChild(rootDiv);
//     //   console.log('Root div created with custom styles');
//     // } else {
//     //   console.log('Root div already exists');
//     // }

//     // Check if the main JS is already injected
//     if (!document.querySelector('script[src="https://norgcdnstorage.blob.core.windows.net/norgcdn-container/plugin-dev/js/main.min.js?750742"]')) {
//       // Include the main JS file
//       const script = document.createElement('script');
//       script.src = 'https://norgcdnstorage.blob.core.windows.net/norgcdn-container/plugin-dev/js/main.min.js?750742';
//       document.body.appendChild(script);
//       console.log('Main JS injected');
//     } else {
//       console.log('Main JS already injected');
//     }
//   `;

//   // Return the script content as a JavaScript response
//   return new NextResponse(scriptContent, {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/javascript',
//     },
//   });
// }
