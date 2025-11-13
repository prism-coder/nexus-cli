import { Layer, Log, Event } from "@prism-dev/nexus";

/**
 * A Layer that will serve as a starting point.
 *
 * @export
 * @class MyLayer
 * @extends {Layer}
 */
export class MyLayer extends Layer {
    /**
     * Called when `MyLayer` is attached to the `LayerStack`.
     *
     * @memberof MyLayer
     */
    OnAttach(): void {
        Log.Info("MyLayer::OnAttach - Attaching MyLayer");
    }

    /**
     * Called when `MyLayer` is detached from the `LayerStack`.
     *
     * @memberof MyLayer
     */
    OnDetach(): void {
        Log.Info("MyLayer::OnDetach - Detaching MyLayer");
    }

    /**
     * Called every `Application` tick with a Timestep.
     *
     * @param {number} ts The time step since the last update.
     * @memberof MyLayer
     */
    OnUpdate(ts: number): void {
        // Log.Info("MyLayer::OnUpdate - Updating MyLayer");
    }

    /**
     * Called every time `MyLayer` receives an `Event`.
     *
     * @param {Event} event The `Event` received on `MyLayer`.
     * @memberof MyLayer
     */
    OnEvent(event: Event): void {
        Log.Info(
            `MyLayer::OnEvent - Received '${event.Name}' Event on MyLayer`
        );
    }
}
