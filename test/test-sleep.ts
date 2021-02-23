import { expect } from "chai";
import sleep from "@utils/sleep";

describe("@utils/sleep", () => {
    it("returns promise that resolves after the specified timeout", (resolve) => {
        const timeout = 500;

        const sleepPromise = sleep(timeout);
        expect(sleepPromise).to.be.instanceOf(Promise);

        let done = false;
        sleepPromise.then(() => done = true);

        setTimeout(() => {
            expect(done).to.be.false;
        }, timeout / 2);

        setTimeout(() => {
            expect(done).to.be.true;
            resolve();
        }, timeout);
    });
});
