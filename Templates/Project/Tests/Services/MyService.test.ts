import { MyService } from "../../Source/Services/MyService";

describe("MyService", () => {
    const service = new MyService();
    
    it("should create", () => {
        expect(service).toBeTruthy();
    });
});
