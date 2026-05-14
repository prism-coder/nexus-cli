import { Service, Log } from "@prism-dev/nexus";

/**
 * Your newly generated `MyService`.
 *
 * @export
 * @class MyService
 * @extends {Service}
 */
export class MyService extends Service {
    /**
     * Creates an instance of `MyService`.
     * 
     * @memberof MyService
     */
    constructor() {
        super();
    }

    /**
     * Initializes `MyService`.
     * This method is called by `app.InitializeServices()`.
     *
     * @returns {Promise<void>}
     * @memberof MyService
     */
    public async OnInitialize(): Promise<void> {
        Log.Info("MyService::OnInitialize - Initializing MyService");

        // Add your async initialization logic here

        return Promise.resolve();
    }

    /**
     * Shuts down `MyService`.
     * This method is called by `app.Close()`.
     *
     * @returns {Promise<void>}
     * @memberof MyService
     */
    public async OnShutdown(): Promise<void> {
        Log.Info("MyService::OnShutdown - Shutting down MyService");

        // Add your async cleanup logic here

        return Promise.resolve();
    }
}