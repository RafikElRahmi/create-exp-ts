import path from "path";
import fs from "fs-extra";

export function createConstants(projectPath) {
    const envVariables = `export default {
    NodeEnv: process.env.NODE_ENV ?? "",
    Port: process.env.PORT ?? 0,
    Client: process.env.CLIENT_URL ?? "*",
    db: {
        uri: process.env.DB_URI ?? "",
        Name: process.env.DB_NAME ?? ""
    },
} as const;
    `;
    const misc = `export enum NodeEnvs {
  Dev = 'development',
  Test = 'test',
  Production = 'production'
}
`;
    const paths = `export default {
  Base: '/api',
  Users: {
    base: '/users',
    one: '/users/:id',
  },
} as const;    
    `;
    fs.writeFileSync(
        path.join(projectPath, "src/constants/Envs.ts"),
        envVariables
    );
    fs.writeFileSync(path.join(projectPath, "src/constants/Misc.ts"), misc);
    fs.writeFileSync(path.join(projectPath, "src/constants/Paths.ts"), paths);
}
