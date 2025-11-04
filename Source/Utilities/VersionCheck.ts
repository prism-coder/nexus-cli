/**
 * Simple in-memory store to avoid multiple network
 * calls in a single execution.
 * 
 * @type {Map<string, string>}
 */
const versionCache = new Map<string, string>();

/**
 * Query the NPM log for the 'latest' dist-tag of a packet.
 *
 * @param {string} packageName The package name (e.g., 'typescript')
 * @returns {Promise<string | null>} The latest version, or null if it fails.
 */
export async function GetLatestVersion(
    packageName: string
): Promise<string | null> {
    if (versionCache.has(packageName)) {
        return versionCache.get(packageName)!;
    }

    try {
        const res = await fetch(`https://registry.npmjs.org/${packageName}`);
        if (!res.ok) {
            return null; // The package does not exist or there was a registration error.
        }

        const data: any = await res.json();
        // The response format is { 'dist-tags': { 'latest': '5.3.3' } }
        const version = data?.["dist-tags"]?.latest;

        if (version) {
            versionCache.set(packageName, version);
            return version;
        }

        return null; // It doesn't have a 'latest' tag
    } catch (error) {
        return null; // Network error (e.g., no connection)
    }
}
