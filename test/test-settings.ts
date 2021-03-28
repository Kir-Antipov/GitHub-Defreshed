import { expect } from "chai";
import settings from "@utils/settings";
import SettingsProperty from "@utils/settings-property";

describe("@utils/settings", () => {
    describe("SettingsProperty", () => {
        const property = new SettingsProperty("name", "title", "description", 42);

        it("SettingsProperty constructor doesn't mutate its arguments", () => {
            expect(property.name).to.equal("name");
            expect(property.title).to.equal("title");
            expect(property.description).to.equal("description");
            expect(property.defaultValue).to.equal(42);
        });

        it("SettingsProperty instance is immutable", () => {
            expect(() => {
                property.name = "";
                expect(property.name).to.equal("");
            }).to.throw();

            expect(() => {
                property.title = "";
                expect(property.title).to.equal("");
            }).to.throw();

            expect(() => {
                property.description = "";
                expect(property.description).to.equal("");
            }).to.throw();

            expect(() => {
                property.defaultValue = 43;
                expect(property.defaultValue).to.equal(43);
            }).to.throw();
        });

        it("SettingsProperty is asynchronous", () => {
            const setPromise = property.setValue(0);
            expect(setPromise).to.be.instanceOf(Promise);

            const getPromise = property.getValue();
            expect(getPromise).to.be.instanceOf(Promise);
        });

        it("SettingsProperty returns defaultValue as... default value", async () => {
            const localProperty = new SettingsProperty("local", "", "", 42);
            const value = await localProperty.getValue();
            expect(value).to.equal(42);
        });

        it("different SettingsProperty instances with the same name are equivalent", async () => {
            const copy = new SettingsProperty(property.name, "", "", property.defaultValue);
            expect(await copy.getValue()).to.not.equal(314);

            await property.setValue(314);
            expect(await copy.getValue()).to.equal(314);
        });
    });

    describe("settings", () => {
        it("settings object extends Array", () => {
            expect(settings).to.be.instanceOf(Array);
        });

        it("every element in settings object is an instance of SettingsProperty", () => {
            settings.forEach(x => {
                expect(x).to.be.instanceOf(SettingsProperty);
            })
        });

        it("settings object has properties with the name of each available option", () => {
            expect(settings).to.include.keys(settings.map(x => x.name));
        });
    });
});
