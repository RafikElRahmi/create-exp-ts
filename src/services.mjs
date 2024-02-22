import path from "path";
import fs from "fs-extra";

export function createServices(projectPath) {
    const UserServices = `import { userData } from "../controllers/user.controller";
import User from "../models/User.Model";

async function getAllUsers() {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
    }
}

async function getUserById(userId: string) {
    try {
        const user = await User.findById(userId);
        return { found: !!user, data: user };
    } catch (error) {
        console.log(error);
    }
}

async function createUser(userData: userData) {
    try {
        const user = new User(userData);
        await user.validate();
        await user.save();
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(userId: string, updateData: userData) {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        });
        return { found: !!updatedUser, data: updatedUser };
    } catch (error) {
        console.log(error);
    }
}

async function deleteUser(userId: string) {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return { found: !!deletedUser, data: deletedUser };
    } catch (error) {
        console.log(error);
    }
}

const userService = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

export default userService;

`;
    fs.writeFileSync(
        path.join(projectPath, "src/services/user.service.ts"),
        UserServices
    );
}
