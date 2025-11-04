#!/usr/bin/env node
// The 'shebang' above is crucial for it to be an executable

import { Command } from "commander";

import { CreateProject } from "./Commands/CreateProject.js";
import { CreateLayer } from "./Commands/CreateLayer.js";
import { CreateEvent } from "./Commands/CreateEvent.js";
import { CreateService } from "./Commands/CreateService.js";

// We need 'import.meta.url' to find the 'Templates' folder
import { fileURLToPath } from "url";
import path from "path";

// Import for automated version checking
import fs from "fs-extra";
import chalk from "chalk";
import semver from "semver";
import { GetLatestVersion } from "./Utilities/VersionCheck.js";

// We define __dirname in an ES Module scope
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

/**
 * Asynchronously checks for a new version of the CLI.
 * It does not block the main execution.
 *
 * @returns {Promise<void>}
 */
async function CheckCliVersion(): Promise<void> {
    try {
        // Read the package.json file from the CLI itself.
        const cliPackageJsonPath = path.resolve(
            __dirname,
            "../package.json"
        );
        const { name: cliName, version: currentVersion } = await fs.readJson(
            cliPackageJsonPath
        );

        const latestVersion = await GetLatestVersion(cliName);

        // If the latest version is older than the current one, it displays a warning.
        if (latestVersion && semver.gt(latestVersion, currentVersion)) {
            console.log(
                chalk.yellow(
`
-------------------------------------------------
New version of ${chalk.bold(cliName)} available: ${chalk.green(latestVersion)}
You are currently using version ${chalk.red(currentVersion)}.
Please update by running: ${chalk.cyan(`npm install -g ${cliName}`)}
-------------------------------------------------
`
                )
            );
        }
    } catch (error) {
        // It fails silently. The version check should
        // not stop the execution of the user's command.
    }
}

async function main(): Promise<void> {
    // We get the version from our own package.json
    const cliPackageJsonPath = path.resolve(__dirname, "../package.json");
    const { version: currentVersion } = await fs.readJson(cliPackageJsonPath);

    // CLI Main Program
    const program = new Command();

    program
        .name("nexus")
        .description("CLI for the Nexus framework")
        .version(currentVersion, "-v, --version", "Output the current version");

    // --- Command: create project ---
    program
        .command("create:project <project-name>")
        .alias("cp")
        .description("Create a new Nexus project structure")
        .action(CreateProject);

    // --- Command: create layer ---
    program
        .command("create:layer <layer-name>")
        .alias("cl")
        .description("Create a new Layer in the Layers directory")
        .action(CreateLayer);

    // --- Command: create event ---
    program
        .command("create:event <event-name>")
        .alias("ce")
        .description("Create a new Event in the Events directory")
        .action(CreateEvent);

    // --- Command: create service ---
    program
        .command("create:service <service-name>")
        .alias("cs")
        .description("Create a new Service in the Services directory")
        .action(CreateService);

    // Parse the command line arguments
    await program.parseAsync(process.argv);

    // Run the version check AFTER the command has been executed
    await CheckCliVersion();
}

(async () => {
    await main();
})();