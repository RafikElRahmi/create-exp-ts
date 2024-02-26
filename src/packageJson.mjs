import fs from "fs-extra";
import path from "path";

export function packageJson(projectOptions) {
    const { projectName, authorName, description, projectVersion, mainEntry } =
        projectOptions;

    const packageJson = `{
  "name": "${projectName}",
  "version": "${projectVersion}",
  "description": "${description}",
  "main": "${mainEntry}",
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc --project tsconfig.prod.json",
    "start": "node  dist/index.js"
  },
  "author": "${authorName}",
  "license": "MIT",
  "dependencies": {
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.18.2",
        "mongodb": "^6.3.0",
        "mongoose": "^8.1.3",
        "zod": "^3.22.4"
    },
    "devDependencies": {
        "@types/cookie-parser": "^1.4.6",
        "@types/express": "4.17.21",
        "@types/node": "20.11.19", 
        "@types/cors": "^2.8.17",
        "nodemon": "^3.0.3",
        "ts-node": "10.9.2",
        "tsc-alias": "^1.8.8",
        "tsconfig-paths": "^4.2.0",
        "typescript": "^5.3.3"
    }
}
`;
    fs.writeFileSync(
        path.join(projectOptions.projectPath, "package.json"),
        packageJson
    );
}
