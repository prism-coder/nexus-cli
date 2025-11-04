import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import ejs from "ejs";
import inquirer from "inquirer";

// Import the __dirname defined in index.ts
import { __dirname } from "../index.js";

import { LoadConfig } from "../Utilities/ConfigLoader.js";

/**
 * Logic for the `create:service` command.
 *
 * @export
 * @param {string} serviceName The name of the new Service.
 * @returns {Promise<void>}
 */
export async function CreateService(serviceName: string): Promise<void> {
    // Load project configuration
    const config = await LoadConfig();
    const targetDir = path.resolve(process.cwd(), config.paths.services);
    const targetFile = path.resolve(targetDir, `${serviceName}.ts`);

    // Check if the file already exists
    if (await fs.pathExists(targetFile)) {
        const { overwrite } = await inquirer.prompt([
            {
                type: "confirm",
                name: "overwrite",
                message: `The Service ${chalk.yellow(
                    serviceName
                )} already exists. Do you want to overwrite it?`,
                default: false,
            },
        ]);

        if (!overwrite) {
            console.log(chalk.red("Operation cancelled."));
            return;
        }
    }

    // Load and render the Service template
    try {
        const templatePath = path.resolve(
            __dirname,
            "../Templates/service.ts.ejs"
        );
        const templateContent = await fs.readFile(templatePath, "utf-8");
        const renderedContent = ejs.render(templateContent, { serviceName });

        // Ensure the directory exists and write the file
        await fs.ensureDir(targetDir);
        await fs.writeFile(targetFile, renderedContent);

        console.log(
            chalk.green(
                `Service ${chalk.bold(serviceName)} created in ${chalk.dim(
                    config.paths.services
                )}!`
            )
        );
    } catch (error) {
        console.error(chalk.red(`\nError creating the Service:`));
        console.error(error);
    }
}