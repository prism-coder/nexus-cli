import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
/**
 * Interface that defines the structure of the Nexus configuration.
 *
 * @export
 * @interface NexusConfig
 */
export interface NexusConfig {
    paths: {
        layers: string;
        events: string;
        services: string;
        tests: string;
    };
    naming: {
        /** When true, appends the type suffix (e.g. 'Layer', 'Event', 'Service') to generated file names. */
        appendSuffix: boolean;
    };
    logging: {
        /** Minimum log level emitted by the Nexus Log utility. */
        level: "debug" | "info" | "warn" | "error";
        /** When true, a timestamp is prepended to every log message. */
        timestamps: boolean;
    };
    generation: {
        /** When true, a corresponding test file is generated alongside each new component. */
        tests: boolean;
    };
}

/**
 * Default configuration values.
 * 
 * @type {NexusConfig}
 * */
const defaultConfig: NexusConfig = {
    paths: {
        layers: "Source/Layers",
        events: "Source/Events",
        services: "Source/Services",
        tests: "Tests",
    },
    naming: {
        appendSuffix: true,
    },
    logging: {
        level: "info",
        timestamps: false,
    },
    generation: {
        tests: false,
    },
};

/**
 * Searches for and loads the project's 'nexus.config.json'.
 * If not found, returns the default configuration.
 *
 * @export
 * @returns {Promise<NexusConfig>} 
 */
export async function LoadConfig(): Promise<NexusConfig> {
    const configPath = path.resolve(process.cwd(), "nexus.config.json");

    try {
        if (await fs.pathExists(configPath)) {
            const userConfig = (await fs.readJson(
                configPath
            )) as Partial<NexusConfig>;
            // Merges user config with defaults for each section,
            // giving precedence to user-defined values.
            return {
                paths: {
                    ...defaultConfig.paths,
                    ...(userConfig.paths || {}),
                },
                naming: {
                    ...defaultConfig.naming,
                    ...(userConfig.naming || {}),
                },
                logging: {
                    ...defaultConfig.logging,
                    ...(userConfig.logging || {}),
                },
                generation: {
                    ...defaultConfig.generation,
                    ...(userConfig.generation || {}),
                },
            };
        } else {
            return defaultConfig;
        }
    } catch (error) {
        console.warn(
            chalk.yellow(
                `Warning: 'nexus.config.json' could not be parsed. Using default configuration.`
            )
        );
        return defaultConfig;
    }
}
