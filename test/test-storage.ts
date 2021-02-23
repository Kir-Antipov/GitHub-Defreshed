import { expect } from "chai";
import storage from "@utils/storage";

describe("@utils/storage", () => {
    it("storage doesn't use `chrome` and `browser` if they aren't valid stores", () => {
        expect(browser).to.exist;
        expect(chrome).to.exist;

        const underlyingStorage = storage.storage["storage"];
        expect(underlyingStorage).to.not.equal(browser);
        expect(underlyingStorage).to.not.equal(chrome);
    });

    it("storage is asynchronous", () => {
        const setPromise = storage.setItem("tmp", "tmp");
        expect(setPromise).to.be.instanceOf(Promise);

        const getPromise = storage.getItem("tmp");
        expect(getPromise).to.be.instanceOf(Promise);
    });

    it("storage returns null if key doesn't exist", async () => {
        const value = await storage.getItem("This key doesn't exist");
        expect(value).to.be.null;
    });

    it("storage doesn't change type of primitives", async () => {
        await storage.setItem("string", "string");
        const str = await storage.getItem<string>("string");
        expect(str).to.equal("string");

        await storage.setItem("number", 1);
        const num = await storage.getItem<number>("number");
        expect(num).to.equal(1);

        await storage.setItem("boolean", true);
        const bool = await storage.getItem<boolean>("boolean");
        expect(bool).to.equal(true);

        await storage.setItem("object", {});
        const obj = await storage.getItem("object");
        expect(obj).to.deep.equal({});
    });

    it("storage can store nested data types", async () => {
        const nested = {
            foo: {
                bar: {
                    baz: {
                        iAmOutOfOverusedExampleNames: {
                            str: "string",
                            bool: false,
                            num: 42,
                        }
                    }
                }
            }
        };

        await storage.setItem("nested", nested);
        const result = await storage.getItem("nested");

        expect(result).to.deep.equal(nested);
    });
});
