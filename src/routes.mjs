import path from "path";
import fs from "fs-extra";

export function createRoutes(projectPath) {
    const UserRoutes= `import { Router } from "express";
import Paths from "../constants/Paths";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/user.controller";
const userRouter = Router();

userRouter.route(Paths.Users.base).get(getAllUsers).post(createUser);
userRouter
    .route(Paths.Users.one)
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default userRouter;
`;
    fs.writeFileSync(
        path.join(projectPath, "src/routes/user.Routes.ts"),
        UserRoutes
    );
}
