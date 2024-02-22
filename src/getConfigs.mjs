import prompts from "prompts";
import path from "path";

export async function getConfigs() {
    const defaultValues =
        process.argv.includes("--yes") || process.argv.includes("-y");
    let projectOptions;
    const newPath =
        process.argv[2] != "--yes" &&
        process.argv[2] != "-y" &&
        process.argv[2];
    if (!defaultValues) {
        const answers = await prompts([
            {
                type: "text",
                name: "projectName",
                message: "Enter your project name:",
                initial: "",
            },
            {
                type: "text",
                name: "projectVersion",
                message: "Enter the version:",
                initial: "",
            },
            {
                type: "text",
                name: "mainEntry",
                message: "main (index.js):",
                initial: "",
            },
            {
                type: "text",
                name: "description",
                message: "Project description:",
                initial: "",
            },
            {
                type: "text",
                name: "authorName",
                message: "Author name:",
                initial: "",
            },
        ]);
        projectOptions = answers;
    } else {
        projectOptions = {
            authorName: "",
            description: "",
        };
    }
    const projName =
        projectOptions.projectName ||
        newPath ||
        path.basename(process.cwd().toString());
    projectOptions = {
        ...projectOptions,
        projectName: projName,
        projectVersion: projectOptions.projectVersion || "1.0.0",
        mainEntry: projectOptions.mainEntry || "index.ts",
    };

    projectOptions.newPath = !(newPath == "." || !newPath);
    projectOptions.projectPath = path.join(
        process.cwd(),
        projectOptions.newPath ? newPath : ""
    );

    return projectOptions;
}
