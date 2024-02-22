import path from "path";
import fs from "fs-extra";

export function createControllers(projectPath) {
    const userController = `import { Request, Response } from "express";
import userService from "../services/user.service";

export async function getAllUsers(_req: Request, res: Response) {
    try {
        const users = await userService.getAllUsers();
        if (!users || !users.length)
            return res.status(404).send("No users found");
        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        if (!id || id.length != 24)
            return res.status(400).send("Id is required");
        const user = await userService.getUserById(id);
        if (!user || !user.found) return res.status(404).send("User not found");
        return res.status(200).send(user.data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
}

export type userData = { password: string; email: string };
export async function createUser(req: Request, res: Response) {
    try {
        const { password, email } = req.body as userData;
        if (!password || !email)
            return res
                .status(400)
                .send("Password and Email are required fields.");
        const newUser = await userService.createUser({ password, email });
        if (!newUser) res.status(500).send("Internal server error");
        return res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { password, email } = req.body as userData;
        const id = req.params.id;
        if (!password || !email || !id || id.length != 24)
            return res
                .status(400)
                .send("id, Password and Email are required to update a User.");
        const updatedUser = await userService.updateUser(id, {
            password,
            email,
        });
        if (!updatedUser || !updatedUser.found)
            res.status(500).send("Internal server error");
        return res.status(201).send(updatedUser?.data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const id = req.params.id;
        if (!id || id.length != 24)
            return res
                .status(400)
                .send("id  is missing in the URL parameters.");
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser || !deletedUser.found)
            return res.status(500).send("Internal server error");
        return res.status(201).send(deletedUser?.data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
}
 
    `;
    fs.writeFileSync(
        path.join(projectPath, "src/controllers/user.controller.ts"),
        userController
    );
}
