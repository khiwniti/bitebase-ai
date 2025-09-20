#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Read current package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Safe dependencies to update (minor/patch versions)
const safeUpdates = {
  "@radix-ui/react-accordion": "^1.2.12",
  "@radix-ui/react-alert-dialog": "^1.1.15",
  "@radix-ui/react-aspect-ratio": "^1.1.7",
  "@radix-ui/react-avatar": "^1.1.10",
  "@radix-ui/react-checkbox": "^1.3.3",
  "@radix-ui/react-context-menu": "^2.2.16",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-slot": "^1.2.3",
  "@radix-ui/react-tabs": "^1.1.13",
  "@types/lodash": "^4.17.20",
  "@types/uuid": "^11.0.0",
  "@types/ws": "^8.18.1",
  "autoprefixer": "10.4.21",
  "class-variance-authority": "^0.7.1",
  "cmdk": "^1.1.1",
  "echarts": "^6.0.0",
  "embla-carousel-react": "^8.6.0",
  "lucide-react": "^0.544.0",
  "mermaid": "^11.12.0",
  "next-themes": "^0.4.6",
  "playwright": "^1.55.0",
  "prettier": "^3.6.2",
  "radix-ui": "^1.4.3",
  "react-day-picker": "^9.10.0",
  "react-draggable": "^4.5.0",
  "react-hook-form": "^7.63.0",
  "react-resizable-panels": "^3.0.6",
  "stripe": "^18.5.0",
  "ws": "^8.18.3",
  "y-websocket": "^3.0.0",
  "yjs": "^13.6.27",
  "zustand": "^5.0.8"
};

// Update dependencies
for (const [dep, version] of Object.entries(safeUpdates)) {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    packageJson.dependencies[dep] = version;
    console.log(`Updated ${dep} to ${version}`);
  }
  if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
    packageJson.devDependencies[dep] = version;
    console.log(`Updated ${dep} (dev) to ${version}`);
  }
}

// Write updated package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
console.log('\nSafe dependencies updated successfully!');