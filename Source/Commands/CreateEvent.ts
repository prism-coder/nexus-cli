import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import ejs from "ejs";
import inquirer from "inquirer";

// Import the __dirname defined in index.ts
import { __dirname } from "../index.js";

import { LoadConfig } from "../Utilities/ConfigLoader.js";

/**
 * Logic for the `create:event` command.
 *
 * @export
 * @param {string} eventName The name of the new Event.
 * @returns {Promise<void>}
 */
export async function CreateEvent(eventName: string): Promise<void> {
    // Load project configuration
    const config = await LoadConfig();
    const targetDir = path.resolve(process.cwd(), config.paths.events);
    const targetFile = path.resolve(targetDir, `${eventName}Event.ts`);

    // Check if the file already exists
    if (await fs.pathExists(targetFile)) {
        const { overwrite } = await inquirer.prompt([
            {
                type: "confirm",
                name: "overwrite",
                message: `The Event ${chalk.yellow(
                    eventName
                )} already exists. Do you want to overwrite it?`,
                default: false,
            },
        ]);

        if (!overwrite) {
            console.log(chalk.red("Operation cancelled."));
            return;
        }
    }

    // Load and render the Event template
    try {
        const templatePath = path.resolve(
            __dirname,
            "../Templates/event.ts.ejs"
        );
        const templateContent = await fs.readFile(templatePath, "utf-8");
        const renderedContent = ejs.render(templateContent, { eventName });

        // Ensure the directory exists and write the file
        await fs.ensureDir(targetDir);
        await fs.writeFile(targetFile, renderedContent);

        console.log(
            chalk.green(
                `Event ${chalk.bold(eventName)} created in ${chalk.dim(
                    config.paths.events
                )}!`
            )
        );
    } catch (error) {
        console.error(chalk.red(`\nError creating the Event:`));
        console.error(error);
    }
}