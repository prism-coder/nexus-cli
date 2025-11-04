import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import ejs from "ejs";
import inquirer from "inquirer";

// Import the __dirname defined in index.ts
import { __dirname } from "../index.js";

import { LoadConfig } from "../Utilities/ConfigLoader.js";

/**
 * Logic for the `create:layer` command.
 *
 * @export
 * @param {string} layerName The name of the new Layer.
 * @returns {Promise<void>}
 */
export async function CreateLayer(layerName: string): Promise<void> {
    // Load project configuration
    const config = await LoadConfig();
    const targetDir = path.resolve(process.cwd(), config.paths.layers);
    const targetFile = path.resolve(targetDir, `${layerName}.ts`);

    // Check if the file already exists
    if (await fs.pathExists(targetFile)) {
        const { overwrite } = await inquirer.prompt([
            {
                type: "confirm",
                name: "overwrite",
                message: `The Layer ${chalk.yellow(
                    layerName
                )} already exists. Do you want to overwrite it?`,
                default: false,
            },
        ]);

        if (!overwrite) {
            console.log(chalk.red("Operation cancelled."));
            return;
        }
    }

    // Load and render the Layer template
    try {
        const templatePath = path.resolve(
            __dirname,
            "../Templates/layer.ts.ejs"
        );
        const templateContent = await fs.readFile(templatePath, "utf-8");
        const renderedContent = ejs.render(templateContent, { layerName });

        // Ensure the directory exists and write the file
        await fs.ensureDir(targetDir);
        await fs.writeFile(targetFile, renderedContent);

        console.log(
            chalk.green(
                `Layer ${chalk.bold(layerName)} created in ${chalk.dim(
                    config.paths.layers
                )}!`
            )
        );
    } catch (error) {
        console.error(chalk.red(`\nError creating the Layer:`));
        console.error(error);
    }
}