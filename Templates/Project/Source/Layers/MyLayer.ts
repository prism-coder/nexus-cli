import { Layer, Log, Event } from "@prism-dev/nexus";

/**
 * A Layer that will serve as a starting point for the
 * Application template.
 *
 * @export
 * @class MyLayer
 * @extends {Layer}
 */
export class MyLayer extends Layer {
    /**
     * Called when the `Layer` is attached to the `LayerStack`.
     *
     * @memberof MyLayer
     */
    OnAttach(): void {
        Log.Info("MyLayer::OnAttach - Attaching MyLayer");
    }

    /**
     * Called when the `Layer` is detached from the `LayerStack`.
     *
     * @memberof MyLayer
     */
    OnDetach(): void {
        Log.Info("MyLayer::OnDetach - Detaching MyLayer");
    }

    /**
     * Called every Application Tick with a Timestep.
     *
     * @param {number} ts The time step since the last update.
     * @memberof MyLayer
     */
    OnUpdate(ts: number): void {
        // Log.Info("MyLayer::OnUpdate - Updating MyLayer");
    }

    /**
     * Called every time this `Layer` receives an `Event`.
     *
     * @param {Event} event
     * @memberof MyLayer
     */
    OnEvent(event: Event): void {
        Log.Info(`MyLayer::OnEvent - Received '${event.Name}' Event on MyLayer`);
    }
}