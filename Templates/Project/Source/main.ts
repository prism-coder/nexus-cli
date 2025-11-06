// Import necessary modules and services from Nexus.
import { Application, ApplicationSpecification, Log } from "@prism-dev/nexus";

// Import custom layers.
import { MyLayer } from "./Layers/MyLayer";

/**
 * Main entry point for the API application.
 * We use an Immediately Invoked Function Expression (IIFE)
 * to allow for async initialization if needed.
 *
 * @remarks
 */
(async () => {
    // Create the ApplicationSpecification.
    const specification: ApplicationSpecification = {
        Name: "MyApp",
    };

    // Create the Application instance.
    const app: Application = new Application(specification);

    // Here we could register Services if needed.
    // e.g., app.RegisterService(MyService, new MyService());

    // Here we would initialize Services if any were registered.
    // await app.InitializeServices();

    // Push Layers onto the Stack.
    app.PushLayer(new MyLayer());

    // Run the Application's main loop.
    app.Run();

    // Add a listener for 'SIGINT' (Signal Interrupt, e.g., Ctrl+C)
    // to gracefully shut down the application.
    process.on("SIGINT", () => {
        Log.Info("main.ts - SIGINT received. Closing application...");
        app.Close();
    });

    // We can also catch unhandled promise rejections.
    process.on("unhandledRejection", (reason, promise) => {
        Log.Fatal(`main.ts - Unhandled Rejection at: ${promise}, reason: ${reason}`);
        app.Close();
    });
})();