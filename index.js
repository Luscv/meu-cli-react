#!/usr/bin/env node
const { execa } = require('execa');
const fs = require('fs');
const path = require('path');

async function main() {
  const projectName = process.argv[2];
  
  if (!projectName) {
    console.error('❌ Provide a name for the project. Example: my-react-quickstart project_name');
    process.exit(1);
  }

  try {
    // Create project using Vite
    await execa('npm', ['create', 'vite@latest', projectName, '--', '--template', 'react'], {
      stdio: 'inherit'
    });

    process.chdir(projectName);

    // Deleting JSX original files
    fs.unlinkSync('src/App.jsx');
    fs.unlinkSync('src/main.jsx');

    // Installing dependencies
    await execa('npm', ['install', '-D', 
      'typescript',
      '@types/react',
      '@types/react-dom',
      'eslint',
      'prettier',
      'eslint-plugin-react',
      'eslint-config-prettier',
      'tailwindcss@latest',
      '@tailwindcss/postcss',
      'postcss@latest',
    ], { stdio: 'inherit' });

    // Setting up Tailwind CSS v4
    fs.writeFileSync('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`);

    // Setting up PostCSS
    fs.writeFileSync('postcss.config.js', `
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
`);

    // Setting up CSS directive @config
    fs.writeFileSync('src/index.css', `
@import "tailwindcss"
`);

    //Creating TypeScript components
    fs.unlinkSync('src/App.css');
    
    fs.writeFileSync('src/App.tsx', `
import React from 'react';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello World!
      </h1>
    </div>
  );
}

export default App;
`);

    fs.writeFileSync('src/main.tsx', `
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import React from 'react';
import App from './App';
import './index.css'

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`);

fs.writeFileSync('tsconfig.json', `
    {
      "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "jsx": "react-jsx",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "types": ["vite/client"]
      },
      "include": ["src"]
    }
    `);
    // Installing other dependencies
    await execa('npm', ['install', 
      'react-icons',
      'lodash',
      'axios'
    ], { stdio: 'inherit' });


    console.log('\n✅ Setup finished with:');
    console.log('- TypeScript initialized');
    console.log('- Tailwind CSS v4');
    console.log('- Prettier');
    console.log('- Eslint');
    console.log('- Axios');

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  }
}

main();