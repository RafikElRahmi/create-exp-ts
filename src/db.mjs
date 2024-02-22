import path from "path";
import fs from "fs-extra";

export function createLibs(projectPath) {
    const db = `import mongoose from "mongoose";
import Envs from "../constants/Envs";

function connectDB() {
    const DB_URI = `+"`"+"${Envs.db.uri}\${Envs.db.Name}"+"`"+`;
    mongoose
        .connect(DB_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(err)
        });
}

export default connectDB;
 `;
    fs.writeFileSync(
        path.join(projectPath, "src/lib/db.ts"),
        db
    );
}
