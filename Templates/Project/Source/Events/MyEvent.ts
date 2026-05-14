import { Event, EventCategory } from "@prism-dev/nexus";

// Import the EventType definitions.
// Adjust the import path as necessary based on your project structure.
import { EventType } from "./Types/EventType";

/**
 * Interface that holds the payload of the `MyEvent`.
 *
 * @export
 * @interface MyEventPayload
 */
export interface MyEventPayload {
    Data: any; // TODO: Replace 'any' with your specific payload structure.
}

/**
 * Your newly generated `MyEvent`.
 *
 * @export
 * @class MyEvent
 * @extends {Event}
 */
export class MyEvent extends Event {
    public readonly Name: string = "MyEvent";

    // TODO: Assign a specific EventType from your 'EventType.ts' file.
    public readonly Type: string = EventType.None;

    // TODO: Assign a logical category. 'Custom' is a good default.
    public readonly Category: EventCategory = EventCategory.Custom;

    public readonly Payload: MyEventPayload;

    /**
     * Creates an instance of `MyEvent`.
     *
     * @param {MyEventPayload} payload The payload for `MyEvent`.
     * @memberof MyEvent
     */
    constructor(payload: MyEventPayload) {
        super();
        this.Payload = payload;
    }
}