import { expect } from "chai";
import { convertToAsync, bindAndConvertToAsync } from "@utils/convert-to-async";

describe("@utils/convert-to-async", () => {
    it("converts plain function to async", async () => {
        const sum = (a: number, b: number) => a + b;

        const promise = convertToAsync(sum, 1, 2);
        expect(promise).to.be.instanceOf(Promise);

        const result = await promise;
        expect(result).to.equal(3);
    });

    it("converts callback function to async", async () => {
        const sum = (a: number, b: number, callback: (result: number) => void) => {
            callback(a + b);
        };

        const promise = convertToAsync(sum, 1, 2);
        expect(promise).to.be.instanceOf(Promise);

        const result = await promise;
        expect(result).to.equal(3);
    });

    it("converts async function to async", async () => {
        const sum = (a: number, b: number) => Promise.resolve(a + b);

        const promise = convertToAsync(sum, 1, 2);
        expect(promise).to.be.instanceOf(Promise);

        const result = await promise;
        expect(result).to.equal(3);
    });

    it("converts instance function to async", async () => {
        const sumObj = {
            c: 3,
            sum(a: number, b: number, callback: (result: number) => void) {
                callback(a + b + this.c);
            },
        };

        const promise = bindAndConvertToAsync(sumObj, sumObj.sum, 1, 2);
        expect(promise).to.be.instanceOf(Promise);

        const result = await promise;
        expect(result).to.equal(6);
    });
});
