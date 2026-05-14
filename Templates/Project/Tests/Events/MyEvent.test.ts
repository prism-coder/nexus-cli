import { MyEvent } from "../../Source/Events/MyEvent";

describe("MyEvent", () => {
    const event = new MyEvent({ Data: null });
    
    it("should create", () => {
        expect(event).toBeTruthy();
    });
});
