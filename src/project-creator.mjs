import fs from "fs-extra";
import path from "path";
import { packageJson } from "./packageJson.mjs";
import { getConfigs } from "./getConfigs.mjs";
import { createTsConfig } from "./tsConfigs.mjs";
import { createConstants } from "./constants.mjs";
import { createEnvs } from "./envs.mjs";
import { createControllers } from "./controllers.mjs";
import { createLibs } from "./db.mjs";
import { createModels } from "./models.mjs";
import { createRoutes } from "./routes.mjs";
import {  createServices } from "./services.mjs";
import { createServer } from "./server.mjs";

export async function createProject() {
    // Use provided options or prompt for them
    const projectOptions = await getConfigs();

    // Project directory
    const { projectPath, newPath } = projectOptions;
    if (newPath) {
        fs.mkdirSync(projectPath);
    }

    // Package.json
    packageJson(projectOptions);

    // tsconfig.json/
    createTsConfig(projectOptions);

    // Directory structure
    fs.mkdirSync(path.join(projectPath, "src"));
    fs.mkdirSync(path.join(projectPath, "env"));
    fs.mkdirSync(path.join(projectPath, "src/constants"));
    fs.mkdirSync(path.join(projectPath, "src/controllers"));
    fs.mkdirSync(path.join(projectPath, "src/lib"));
    fs.mkdirSync(path.join(projectPath, "src/models"));
    fs.mkdirSync(path.join(projectPath, "src/routes"));
    fs.mkdirSync(path.join(projectPath, "src/services"));

    //Constants
    createConstants(projectPath);

    //Envs
    createEnvs(projectPath);

    //Controllers
    createControllers(projectPath);

    //Libs
    createLibs(projectPath);

    //Models
    createModels(projectPath);

    //Routes
    createRoutes(projectPath);

    //Services
    createServices(projectPath);

    //Server
    createServer(projectPath);

    
    console.log(`Project  created successfully!`);
}
