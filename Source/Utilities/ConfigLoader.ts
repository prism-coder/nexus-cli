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
            // Merges user paths with default paths
            // giving precedence to user-defined paths.
            return {
                paths: {
                    ...defaultConfig.paths,
                    ...(userConfig.paths || {}),
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
