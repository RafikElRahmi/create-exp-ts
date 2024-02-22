import path from "path";
import fs from "fs-extra";

export function createModels(projectPath) {
    const UserModel = `import { ObjectId } from "mongodb";
import {  Schema, model, models } from "mongoose";
import { z } from "zod";

const userSchema = z.object({
    _id: z.instanceof(ObjectId),
    email: z.string().email("Invalid email format"),
    password: z.string().min(3, "Name must be at least 3 characters"),
});
export type IUser = z.infer<typeof userSchema>;

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = models.User || model("User", UserSchema);
export default User; `;
    fs.writeFileSync(
        path.join(projectPath, "src/models/User.Model.ts"),
        UserModel
    );
}
