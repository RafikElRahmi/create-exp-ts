import path from "path";
import fs from "fs-extra";

export function createEnvs(projectPath) {
    const development = `NODE_ENV=development

#host
PORT=3000
CLIENT_URL=http://localhost:3001

#database
DB_URI=mongodb://localhost:27017/
DB_NAME=dev
    `;
    const production = `NODE_ENV=production
    
#host
PORT=8081
CLIENT_URL=http://localhost:3000

#database
DB_URI=mongodb://localhost:27017/
DB_NAME=dbName
`;
    const test = `NODE_ENV=test
    
#host
PORT=4000
CLIENT_URL=http://localhost:3000

#database
DB_URI=mongodb://localhost:27017/
DB_NAME=test   
    `;
    fs.writeFileSync(
        path.join(projectPath, "env/development.env"),
        development
    );
    fs.writeFileSync(path.join(projectPath, "env/production.env"), production);
    fs.writeFileSync(path.join(projectPath, "env/test.env"), test);
}
