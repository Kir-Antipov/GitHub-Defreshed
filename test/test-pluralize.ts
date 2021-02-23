import { expect } from "chai";
import pluralize from "@utils/pluralize";

const examples = [
    ["commit", "commits"],
    ["branch", "branches"],
    ["package", "packages"],
    ["release", "releases"],
    ["contributor", "contributors"],
].map(x => ({ singular: x[0], plural: x[1] }));

describe("@utils/pluralize", () => {
    it("pluralizes when there're multiple (> 1) objects", () => {
        examples.forEach(x => {
            expect(pluralize(x.singular, 2)).to.equal(x.plural);
        });
    });

    it("pluralizes when there're no (= 0) objects", () => {
        examples.forEach(x => {
            expect(pluralize(x.singular, 0)).to.equal(x.plural);
        });
    });

    it("doesn't pluralize when there's one (= 1) object", () => {
        examples.forEach(x => {
            expect(pluralize(x.singular, 1)).to.equal(x.singular);
        });
    });

    it("doesn't pluralize when count is negative (< 0)", () => {
        examples.forEach(x => {
            expect(pluralize(x.singular, -1)).to.equal(x.singular);
        });

        examples.forEach(x => {
            expect(pluralize(x.singular, -42)).to.equal(x.singular);
        });
    });
});
