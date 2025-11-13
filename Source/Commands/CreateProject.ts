import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ejs from 'ejs';
import inquirer from 'inquirer';

// Import the __dirname defined in index.ts
import { __dirname } from '../index.js';

// Import version check utility
import { GetLatestVersion } from '../Utilities/VersionCheck.js';

/**
 * Logic for the `create:project` command.
 *
 * @export
 * @param {string} projectName The name of the new project.
 * @returns {Promise<void>}
 */
export async function CreateProject(projectName: string): Promise<void> {
    console.log(chalk.blue(`Creating a new Nexus project: ${chalk.bold(projectName)}...`));

    // Define routes
    const targetDir = path.resolve(process.cwd(), projectName);

    // Template directory
    const templateDir = path.resolve(__dirname, '../Templates/Project');

    // Check if the directory already exists
    if (await fs.pathExists(targetDir)) {
        const { overwrite } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: `The directory ${chalk.yellow(projectName)} already exists. Do you want to overwrite it?`,
                default: false,
            },
        ]);

        if (!overwrite) {
            console.log(chalk.red("Operation cancelled."));
            process.exit(0);
        }

        // If it is overwritten, we first delete the directory.
        console.log(chalk.dim(`Deleting existing directory...`));
        await fs.remove(targetDir);
    }

    try {
        console.log(
            chalk.dim("Searching for the latest versions of dependencies...")
        );

        const [nexusVersion, typesNodeVersion, typescriptVersion] =
            await Promise.all([
                GetLatestVersion("@prism-dev/nexus"),
                GetLatestVersion("@types/node"),
                GetLatestVersion("typescript"),
            ]);

        // Get the CLI package.json
        const cliPackageJsonPath = path.resolve(
            __dirname,
            "../package.json"
        );

        // Get the CLI version
        const { version: currentVersion } = await fs.readJson(
            cliPackageJsonPath
        );

        // Template data, with fallbacks in case NPM fails
        const templateData = {
            projectName,
            currentVersion: currentVersion || "1.1.4", // Current CLI version
            nexusVersion: nexusVersion || "1.1.3", // Original version
            typesNodeVersion: typesNodeVersion || "20.11.0", // A recent LTS
            typescriptVersion: typescriptVersion || "5.3.3", // A recent stable
        };

        // Copy all template files
        await fs.copy(templateDir, targetDir);

        // Render the package.json.ejs template
        const pkgJsonTemplatePath = path.join(targetDir, "package.json.ejs");
        const pkgJsonContent = await fs.readFile(pkgJsonTemplatePath, "utf-8");

        // We passed the template data to EJS
        const renderedPkgJson = ejs.render(pkgJsonContent, templateData);

        // Write the final package.json
        await fs.writeFile(
            path.join(targetDir, "package.json"),
            renderedPkgJson
        );

        // Render the README.md.ejs template
        const readmeTemplatePath = path.join(targetDir, "README.md.ejs");
        const readmeContent = await fs.readFile(readmeTemplatePath, "utf-8");

        // We passed the version data to EJS
        const renderedReadme = ejs.render(readmeContent, templateData);

        // Write the final README.md
        await fs.writeFile(path.join(targetDir, "README.md"), renderedReadme);

        // Rename special files
        // .gitignore
        await fs.rename(
            path.join(targetDir, "gitignore.txt"),
            path.join(targetDir, ".gitignore")
        );

        // Delete .ejs files
        await fs.remove(pkgJsonTemplatePath);
        await fs.remove(readmeTemplatePath);

        // Success
        console.log(
            chalk.green(
                `\nProject ${chalk.bold(projectName)} was successfully created!`
            )
        );
        console.log(chalk.cyan("\nNext steps:"));
        console.log(`  1. ${chalk.bold(`cd ${projectName}`)}`);
        console.log(`  2. ${chalk.bold(`npm install`)} (or yarn/pnpm)`);
        console.log(`  3. ${chalk.bold(`npm start`)}`);
    } catch (error) {
        console.error(chalk.red(`\nError creating project:`));
        console.error(error);
        await fs.remove(targetDir); // Clean up in case of error
    }
}