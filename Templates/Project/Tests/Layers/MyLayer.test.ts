import { MyLayer } from "../../Source/Layers/MyLayer";

describe("MyLayer", () => {
    const layer = new MyLayer();
    
    it("should create", () => {
        expect(layer).toBeTruthy();
    });
});
