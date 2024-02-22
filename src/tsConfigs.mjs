import fs from "fs-extra";
import path from "path";

export function createTsConfig(projectOptions) {
    const tsConfigs = `{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "outDir": "./dist",
        "esModuleInterop": true,
        "strict": true,
        "allowImportingTsExtensions":true,
        "noEmit": true
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules"]
}

`;
  const tsConfigsProd = `{
    "compilerOptions": {
        "target": "ES6",
        "module": "CommonJS",
        "strict": true,
        "noImplicitAny": false,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "outDir": "./dist"
    },
    "ts-node": {
        "esm": true,
        "experimentalSpecifierResolution": "node"
    },
    "include": ["**/*.ts", "**/*.tsx", "index.ts"],
    "exclude": ["node_modules"]
}
`;
    fs.writeFileSync(
        path.join(projectOptions.projectPath, "tsconfig.json"),
        tsConfigs
  );
  fs.writeFileSync(
      path.join(projectOptions.projectPath, "tsconfig.prod.json"),
      tsConfigsProd
  );
}
