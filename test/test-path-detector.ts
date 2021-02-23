import { expect } from "chai";
import * as detector from "@utils/path-detector";

describe("@utils/path-detector", () => {
    describe("cleanPathname", () => {
        const { cleanPathname } = detector;

        it("extracts pathname without leading and trailing slashes from absolute url", () => {
            expect(cleanPathname("https://github.com/Kir-Antipov/GitHub-Defreshed/")).to.equal("Kir-Antipov/GitHub-Defreshed");
            expect(cleanPathname("https://github.com/Kir-Antipov/")).to.equal("Kir-Antipov");
            expect(cleanPathname("https://github.com/Kir-Antipov")).to.equal("Kir-Antipov");
            expect(cleanPathname("https://github.com/")).to.equal("");
            expect(cleanPathname("https://github.com")).to.equal("");
        });

        it("extracts pathname without leading and trailing slashes from relative url", () => {
            expect(cleanPathname("/Kir-Antipov/GitHub-Defreshed/")).to.equal("Kir-Antipov/GitHub-Defreshed");
            expect(cleanPathname("/Kir-Antipov/")).to.equal("Kir-Antipov");
            expect(cleanPathname("Kir-Antipov/")).to.equal("Kir-Antipov");
            expect(cleanPathname("Kir-Antipov")).to.equal("Kir-Antipov");
            expect(cleanPathname("/")).to.equal("");
            expect(cleanPathname("")).to.equal("");
        });
    });

    describe("getOwnerAndRepo", () => {
        const { getOwnerAndRepo } = detector;

        it("extracts owner and repository name from absolute url", () => {
            expect(getOwnerAndRepo("https://github.com/Kir-Antipov/GitHub-Defreshed/")).to.deep.equal({ owner: "Kir-Antipov", repo: "GitHub-Defreshed" });
            expect(getOwnerAndRepo("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/index.ts")).to.deep.equal({ owner: "Kir-Antipov", repo: "GitHub-Defreshed" });
            expect(getOwnerAndRepo("http://github.com/proteriax/jsx-dom/")).to.deep.equal({ owner: "proteriax", repo: "jsx-dom" });
            expect(getOwnerAndRepo("https://github.com/StylishThemes/GitHub-Dark")).to.deep.equal({ owner: "StylishThemes", repo: "GitHub-Dark" });
        });

        it("extracts owner and repository name from relative url", () => {
            expect(getOwnerAndRepo("/Kir-Antipov/GitHub-Defreshed/")).to.deep.equal({ owner: "Kir-Antipov", repo: "GitHub-Defreshed" });
            expect(getOwnerAndRepo("proteriax/jsx-dom/")).to.deep.equal({ owner: "proteriax", repo: "jsx-dom" });
            expect(getOwnerAndRepo("StylishThemes/GitHub-Dark")).to.deep.equal({ owner: "StylishThemes", repo: "GitHub-Dark" });
        });

        it("returns null if the given url doesn't point to the repository page", () => {
            expect(getOwnerAndRepo("This is not url")).to.be.null;
            expect(getOwnerAndRepo("https://github.com/Kir-Antipov/")).to.be.null;
            expect(getOwnerAndRepo("https://github.com/Kir-Antipov")).to.be.null;
            expect(getOwnerAndRepo("/Kir-Antipov/")).to.be.null;
            expect(getOwnerAndRepo("/Kir-Antipov")).to.be.null;
            expect(getOwnerAndRepo("Kir-Antipov/")).to.be.null;
            expect(getOwnerAndRepo("Kir-Antipov")).to.be.null;

            expect(getOwnerAndRepo("https://github.com/settings/appearance/")).to.be.null;
            expect(getOwnerAndRepo("https://github.com/settings/appearance")).to.be.null;
            expect(getOwnerAndRepo("/settings/appearance/")).to.be.null;
            expect(getOwnerAndRepo("/settings/appearance")).to.be.null;
            expect(getOwnerAndRepo("settings/appearance/")).to.be.null;
            expect(getOwnerAndRepo("settings/appearance")).to.be.null;
        });
    });

    describe("getRepoURL", () => {
        const { getRepoURL } = detector;

        it("extracts relative path to the root of the repository from absolute url", () => {
            expect(getRepoURL("https://github.com/Kir-Antipov/GitHub-Defreshed/")).to.equal("Kir-Antipov/GitHub-Defreshed");
            expect(getRepoURL("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/index.ts")).to.equal("Kir-Antipov/GitHub-Defreshed");
            expect(getRepoURL("http://github.com/proteriax/jsx-dom/")).to.equal("proteriax/jsx-dom");
            expect(getRepoURL("https://github.com/StylishThemes/GitHub-Dark")).to.equal("StylishThemes/GitHub-Dark");
        });

        it("extracts relative path to the root of the repository from relative url", () => {
            expect(getRepoURL("/Kir-Antipov/GitHub-Defreshed/")).to.equal("Kir-Antipov/GitHub-Defreshed");
            expect(getRepoURL("Kir-Antipov/GitHub-Defreshed/blob/development/src/index.ts")).to.equal("Kir-Antipov/GitHub-Defreshed");
            expect(getRepoURL("proteriax/jsx-dom/")).to.equal("proteriax/jsx-dom");
            expect(getRepoURL("/StylishThemes/GitHub-Dark")).to.equal("StylishThemes/GitHub-Dark");
        });

        it("returns null if the given url doesn't point to the repository page", () => {
            expect(getRepoURL("This is not url")).to.be.null;
            expect(getRepoURL("https://github.com/Kir-Antipov/")).to.be.null;
            expect(getRepoURL("https://github.com/Kir-Antipov")).to.be.null;
            expect(getRepoURL("/Kir-Antipov/")).to.be.null;
            expect(getRepoURL("/Kir-Antipov")).to.be.null;
            expect(getRepoURL("Kir-Antipov/")).to.be.null;
            expect(getRepoURL("Kir-Antipov")).to.be.null;

            expect(getRepoURL("https://github.com/settings/appearance/")).to.be.null;
            expect(getRepoURL("https://github.com/settings/appearance")).to.be.null;
            expect(getRepoURL("/settings/appearance/")).to.be.null;
            expect(getRepoURL("/settings/appearance")).to.be.null;
            expect(getRepoURL("settings/appearance/")).to.be.null;
            expect(getRepoURL("settings/appearance")).to.be.null;
        });
    });

    describe("getRepoPath", () => {
        const { getRepoPath } = detector;

        it("extracts repo path from absolute url", () => {
            expect(getRepoPath("https://github.com/Kir-Antipov/GitHub-Defreshed/")).to.equal("");
            expect(getRepoPath("https://github.com/Kir-Antipov/GitHub-Defreshed")).to.equal("");
            expect(getRepoPath("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/master/src")).to.equal("tree/master/src");
            expect(getRepoPath("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/master/src/")).to.equal("tree/master/src");
            expect(getRepoPath("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/index.ts")).to.equal("blob/development/src/index.ts");
        });

        it("extracts repo path from relative url", () => {
            expect(getRepoPath("/Kir-Antipov/GitHub-Defreshed/")).to.equal("");
            expect(getRepoPath("Kir-Antipov/GitHub-Defreshed")).to.equal("");
            expect(getRepoPath("/Kir-Antipov/GitHub-Defreshed/tree/master/src")).to.equal("tree/master/src");
            expect(getRepoPath("Kir-Antipov/GitHub-Defreshed/tree/master/src/")).to.equal("tree/master/src");
            expect(getRepoPath("Kir-Antipov/GitHub-Defreshed/blob/development/src/index.ts")).to.equal("blob/development/src/index.ts");
        });

        it("returns null if the given url doesn't point to the repository page", () => {
            expect(getRepoPath("This is not url")).to.be.null;
            expect(getRepoPath("https://github.com/Kir-Antipov/")).to.be.null;
            expect(getRepoPath("https://github.com/Kir-Antipov")).to.be.null;
            expect(getRepoPath("/Kir-Antipov/")).to.be.null;
            expect(getRepoPath("/Kir-Antipov")).to.be.null;
            expect(getRepoPath("Kir-Antipov/")).to.be.null;
            expect(getRepoPath("Kir-Antipov")).to.be.null;

            expect(getRepoPath("https://github.com/settings/appearance/")).to.be.null;
            expect(getRepoPath("https://github.com/settings/appearance")).to.be.null;
            expect(getRepoPath("/settings/appearance/")).to.be.null;
            expect(getRepoPath("/settings/appearance")).to.be.null;
            expect(getRepoPath("settings/appearance/")).to.be.null;
            expect(getRepoPath("settings/appearance")).to.be.null;
        });
    });

    describe("isRoot", () => {
        const { isRoot } = detector;

        it("returns true if absolute url points to the root page", () => {
            expect(isRoot("https://github.com/")).to.be.true;
            expect(isRoot("https://github.com")).to.be.true;
        });

        it("returns true if relative url points to the root page", () => {
            expect(isRoot("/")).to.be.true;
            expect(isRoot("")).to.be.true;
        });

        it("returns false if absolute url doesn't point to the root page", () => {
            expect(isRoot("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isRoot("https://github.com/Kir-Antipov/GitHub-Defreshed")).to.be.false;
        });

        it("returns false if relative url doesn't point to the root page", () => {
            expect(isRoot("/Kir-Antipov/GitHub-Defreshed")).to.be.false;
            expect(isRoot("Kir-Antipov/GitHub-Defreshed")).to.be.false;
        });
    });

    describe("isNotifications", () => {
        const { isNotifications } = detector;

        it("returns true if absolute url points to the notifications page", () => {
            expect(isNotifications("https://github.com/notifications")).to.be.true;
            expect(isNotifications("http://github.com/notifications/")).to.be.true;
            expect(isNotifications("https://github.com/notifications?query=reason%3Aassign")).to.be.true;
        });

        it("returns true if relative url points to the notifications page", () => {
            expect(isNotifications("/notifications/")).to.be.true;
            expect(isNotifications("/notifications")).to.be.true;
            expect(isNotifications("notifications/")).to.be.true;
            expect(isNotifications("notifications")).to.be.true;
            expect(isNotifications("notifications?query=reason%3Aassign")).to.be.true;
        });

        it("returns false if absolute url doesn't point to the notifications page", () => {
            expect(isNotifications("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isNotifications("https://github.com/Kir-Antipov/notifications")).to.be.false;
            expect(isNotifications("https://github.com/notifications/Kir-Antipov/")).to.be.false;
        });

        it("returns false if relative url doesn't point to the notifications page", () => {
            expect(isNotifications("/Kir-Antipov/")).to.be.false;
            expect(isNotifications("Kir-Antipov/notifications")).to.be.false;
            expect(isNotifications("/notifications/Kir-Antipov/")).to.be.false;
        });
    });

    describe("isRepo", () => {
        const { isRepo } = detector;

        it("returns true if absolute url points to some repository", () => {
            expect(isRepo("https://github.com/Kir-Antipov/GitHub-Defreshed/")).to.be.true;
            expect(isRepo("http://github.com/Kir-Antipov/GitHub-Defreshed/tree/master/src")).to.be.true;
            expect(isRepo("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/index.ts")).to.be.true;
        });

        it("returns true if relative url points to some repository", () => {
            expect(isRepo("/Kir-Antipov/GitHub-Defreshed/")).to.be.true;
            expect(isRepo("/Kir-Antipov/GitHub-Defreshed")).to.be.true;
            expect(isRepo("Kir-Antipov/GitHub-Defreshed/tree/master/src/")).to.be.true;
            expect(isRepo("Kir-Antipov/GitHub-Defreshed/blob/development/src/index.ts")).to.be.true;
        });

        it("returns false if absolute url doesn't point to any repository", () => {
            expect(isRepo("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isRepo("https://github.com/notifications")).to.be.false;
            expect(isRepo("https://github.com/notifications/Kir-Antipov/")).to.be.false;
            expect(isRepo("https://github.com/settings/appearance/")).to.be.false;
        });

        it("returns false if relative url doesn't point to any repository", () => {
            expect(isRepo("/Kir-Antipov/")).to.be.false;
            expect(isRepo("notifications")).to.be.false;
            expect(isRepo("/notifications/Kir-Antipov/")).to.be.false;
            expect(isRepo("settings/appearance")).to.be.false;
        });
    });

    describe("isRepoRoot", () => {
        const { isRepoRoot } = detector;

        it("returns true if absolute url points to the repository's root", () => {
            expect(isRepoRoot("https://github.com/Kir-Antipov/GitHub-Defreshed/")).to.be.true;
            expect(isRepoRoot("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/master/")).to.be.true;
            expect(isRepoRoot("http://github.com/Kir-Antipov/GitHub-Defreshed/tree/development")).to.be.true;
        });

        it("returns true if relative url points to the repository's root", () => {
            expect(isRepoRoot("/Kir-Antipov/GitHub-Defreshed/")).to.be.true;
            expect(isRepoRoot("/Kir-Antipov/GitHub-Defreshed/tree/master")).to.be.true;
            expect(isRepoRoot("Kir-Antipov/GitHub-Defreshed/tree/development/")).to.be.true;
            expect(isRepoRoot("Kir-Antipov/GitHub-Defreshed/tree/repo")).to.be.true;
        });

        it("returns false if absolute url doesn't point to the repository's root", () => {
            expect(isRepoRoot("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isRepoRoot("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isRepoRoot("https://github.com/notifications")).to.be.false;
            expect(isRepoRoot("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isRepoRoot("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isRepoRoot("https://github.com/settings/appearance/")).to.be.false;
        });

        it("returns false if relative url doesn't point to the repository's root", () => {
            expect(isRepoRoot("/Kir-Antipov/")).to.be.false;
            expect(isRepoRoot("notifications")).to.be.false;
            expect(isRepoRoot("/notifications/Kir-Antipov")).to.be.false;
            expect(isRepoRoot("/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isRepoRoot("settings/appearance")).to.be.false;
        });
    });

    describe("isRepoTree", () => {
        const { isRepoTree } = detector;

        it("returns true if absolute url points to the repository's tree", () => {
            expect(isRepoTree("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/master/")).to.be.true;
            expect(isRepoTree("http://github.com/Kir-Antipov/GitHub-Defreshed/tree/development")).to.be.true;
        });

        it("returns true if relative url points to the repository's tree", () => {
            expect(isRepoTree("/Kir-Antipov/GitHub-Defreshed/tree/master")).to.be.true;
            expect(isRepoTree("Kir-Antipov/GitHub-Defreshed/tree/development/")).to.be.true;
            expect(isRepoTree("Kir-Antipov/GitHub-Defreshed/tree/repo")).to.be.true;
        });

        it("returns false if absolute url doesn't point to the repository's tree", () => {
            expect(isRepoTree("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isRepoTree("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isRepoTree("https://github.com/notifications")).to.be.false;
            expect(isRepoTree("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isRepoTree("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isRepoTree("https://github.com/settings/appearance/")).to.be.false;
        });

        it("returns false if relative url doesn't point to the repository's tree", () => {
            expect(isRepoTree("/Kir-Antipov/")).to.be.false;
            expect(isRepoTree("notifications")).to.be.false;
            expect(isRepoTree("/notifications/Kir-Antipov")).to.be.false;
            expect(isRepoTree("/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isRepoTree("settings/appearance")).to.be.false;
        });
    });

    describe("isSingleFile", () => {
        const { isSingleFile } = detector;

        it("returns true if absolute url points to the blob", () => {
            expect(isSingleFile("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.true;
            expect(isSingleFile("http://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.true;
        });

        it("returns true if relative url points to the blob", () => {
            expect(isSingleFile("Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.true;
            expect(isSingleFile("/Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.true;
        });

        it("returns false if absolute url doesn't point to any blob", () => {
            expect(isSingleFile("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isSingleFile("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isSingleFile("https://github.com/notifications")).to.be.false;
            expect(isSingleFile("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isSingleFile("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isSingleFile("https://github.com/settings/appearance/")).to.be.false;
            expect(isSingleFile("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.js")).to.be.false;
            expect(isSingleFile("https://raw.githubusercontent.com/Kir-Antipov/GitHub-Defreshed/development/src/utils/convert-to-async.ts")).to.be.false;
        });

        it("returns false if relative url doesn't point to any blob", () => {
            expect(isSingleFile("/Kir-Antipov/")).to.be.false;
            expect(isSingleFile("notifications")).to.be.false;
            expect(isSingleFile("/notifications/Kir-Antipov")).to.be.false;
            expect(isSingleFile("/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isSingleFile("settings/appearance")).to.be.false;
            expect(isSingleFile("/Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.false;
            expect(isSingleFile("Kir-Antipov/GitHub-Defreshed/development/src/utils/convert-to-async.ts")).to.be.false;
        });
    });

    describe("isRaw", () => {
        const { isRaw } = detector;

        it("returns true if absolute url points to the raw file", () => {
            expect(isRaw("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/master/LICENSE.md")).to.be.true;
            expect(isRaw("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.true;
        });

        it("returns true if relative url points to the raw file", () => {
            expect(isRaw("Kir-Antipov/GitHub-Defreshed/raw/master/LICENSE.md")).to.be.true;
            expect(isRaw("/Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.true;
        });

        it("returns false if absolute url doesn't point to any raw file", () => {
            expect(isRaw("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isRaw("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isRaw("https://github.com/notifications")).to.be.false;
            expect(isRaw("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isRaw("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isRaw("https://github.com/settings/appearance/")).to.be.false;
            expect(isRaw("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.false;
            expect(isRaw("http://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.false;
        });

        it("returns false if relative url doesn't point to any raw file", () => {
            expect(isRaw("Kir-Antipov")).to.be.false;
            expect(isRaw("/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isRaw("/notifications")).to.be.false;
            expect(isRaw("notifications/Kir-Antipov/")).to.be.false;
            expect(isRaw("/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isRaw("/settings/appearance/")).to.be.false;
            expect(isRaw("/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.false;
            expect(isRaw("Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.false;
        });
    });

    describe("isArchive", () => {
        const { isArchive } = detector;

        it("returns true if absolute url points to the archive", () => {
            expect(isArchive("https://github.com/Kir-Antipov/GitHub-Defreshed/archive/master.zip")).to.be.true;
            expect(isArchive("https://github.com/Kir-Antipov/GitHub-Defreshed/archive/development.zip")).to.be.true;
            expect(isArchive("http://github.com/Kir-Antipov/GitHub-Defreshed/archive/development.rar")).to.be.true;
        });

        it("returns true if relative url points to the archive", () => {
            expect(isArchive("/Kir-Antipov/GitHub-Defreshed/archive/master.zip")).to.be.true;
            expect(isArchive("Kir-Antipov/GitHub-Defreshed/archive/development.zip")).to.be.true;
            expect(isArchive("Kir-Antipov/GitHub-Defreshed/archive/development.rar")).to.be.true;
        });

        it("returns false if absolute url doesn't point to any archive", () => {
            expect(isArchive("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isArchive("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isArchive("https://github.com/notifications")).to.be.false;
            expect(isArchive("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isArchive("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isArchive("https://github.com/settings/appearance/")).to.be.false;
            expect(isArchive("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.false;
            expect(isArchive("http://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.false;
            expect(isArchive("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/master/LICENSE.md")).to.be.false;
            expect(isArchive("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.false;
        });

        it("returns false if relative url doesn't point to any archive", () => {
            expect(isArchive("Kir-Antipov")).to.be.false;
            expect(isArchive("/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isArchive("/notifications")).to.be.false;
            expect(isArchive("notifications/Kir-Antipov/")).to.be.false;
            expect(isArchive("/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isArchive("/settings/appearance/")).to.be.false;
            expect(isArchive("/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.false;
            expect(isArchive("Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.false;
            expect(isArchive("/Kir-Antipov/GitHub-Defreshed/raw/master/LICENSE.md")).to.be.false;
            expect(isArchive("Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.false;
        });
    });

    describe("isReleaseFile", () => {
        const { isReleaseFile } = detector;

        it("returns true if absolute url points to the release's file", () => {
            expect(isReleaseFile("https://github.com/Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.1/github-defreshed.meta.js")).to.be.true;
            expect(isReleaseFile("https://github.com/Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.1/github-defreshed.user.js")).to.be.true;
            expect(isReleaseFile("http://github.com/Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.0/github-defreshed.xpi")).to.be.true;
        });

        it("returns true if relative url points to the release's file", () => {
            expect(isReleaseFile("Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.1/github-defreshed.meta.js")).to.be.true;
            expect(isReleaseFile("Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.1/github-defreshed.user.js")).to.be.true;
            expect(isReleaseFile("/Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.0/github-defreshed.xpi")).to.be.true;
        });

        it("returns false if absolute url doesn't point to any release's file", () => {
            expect(isReleaseFile("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isReleaseFile("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isReleaseFile("https://github.com/notifications")).to.be.false;
            expect(isReleaseFile("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isReleaseFile("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isReleaseFile("https://github.com/settings/appearance/")).to.be.false;
            expect(isReleaseFile("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.false;
            expect(isReleaseFile("http://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.false;
            expect(isReleaseFile("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/master/LICENSE.md")).to.be.false;
            expect(isReleaseFile("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.false;
            expect(isReleaseFile("https://github.com/Kir-Antipov/GitHub-Defreshed/archive/master.zip")).to.be.false;
            expect(isReleaseFile("https://github.com/Kir-Antipov/GitHub-Defreshed/archive/development.zip")).to.be.false;
            expect(isReleaseFile("http://github.com/Kir-Antipov/GitHub-Defreshed/archive/development.rar")).to.be.false;
        });

        it("returns false if relative url doesn't point to any release's file", () => {
            expect(isReleaseFile("Kir-Antipov")).to.be.false;
            expect(isReleaseFile("/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isReleaseFile("/notifications")).to.be.false;
            expect(isReleaseFile("notifications/Kir-Antipov/")).to.be.false;
            expect(isReleaseFile("/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isReleaseFile("/settings/appearance/")).to.be.false;
            expect(isReleaseFile("/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.false;
            expect(isReleaseFile("Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.false;
            expect(isReleaseFile("/Kir-Antipov/GitHub-Defreshed/raw/master/LICENSE.md")).to.be.false;
            expect(isReleaseFile("Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.false;
            expect(isReleaseFile("/Kir-Antipov/GitHub-Defreshed/archive/master.zip")).to.be.false;
            expect(isReleaseFile("/Kir-Antipov/GitHub-Defreshed/archive/development.zip")).to.be.false;
            expect(isReleaseFile("Kir-Antipov/GitHub-Defreshed/archive/development.rar")).to.be.false;
        });
    });

    describe("isFile", () => {
        const { isFile } = detector;

        it("returns true if absolute url points to the downloadable file", () => {
            expect(isFile("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/master/LICENSE.md")).to.be.true;
            expect(isFile("https://github.com/Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.true;
            expect(isFile("https://github.com/Kir-Antipov/GitHub-Defreshed/archive/master.zip")).to.be.true;
            expect(isFile("https://github.com/Kir-Antipov/GitHub-Defreshed/archive/development.zip")).to.be.true;
            expect(isFile("http://github.com/Kir-Antipov/GitHub-Defreshed/archive/development.rar")).to.be.true;
            expect(isFile("https://github.com/Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.1/github-defreshed.meta.js")).to.be.true;
            expect(isFile("https://github.com/Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.1/github-defreshed.user.js")).to.be.true;
            expect(isFile("http://github.com/Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.0/github-defreshed.xpi")).to.be.true;
        });

        it("returns true if relative url points to the downloadable file", () => {
            expect(isFile("Kir-Antipov/GitHub-Defreshed/raw/master/LICENSE.md")).to.be.true;
            expect(isFile("/Kir-Antipov/GitHub-Defreshed/raw/development/src/utils/convert-to-async.ts")).to.be.true;
            expect(isFile("/Kir-Antipov/GitHub-Defreshed/archive/master.zip")).to.be.true;
            expect(isFile("/Kir-Antipov/GitHub-Defreshed/archive/development.zip")).to.be.true;
            expect(isFile("/Kir-Antipov/GitHub-Defreshed/archive/development.rar")).to.be.true;
            expect(isFile("Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.1/github-defreshed.meta.js")).to.be.true;
            expect(isFile("Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.1/github-defreshed.user.js")).to.be.true;
            expect(isFile("/Kir-Antipov/GitHub-Defreshed/releases/download/v3.0.0/github-defreshed.xpi")).to.be.true;
        });

        it("returns false if absolute url doesn't point to any downloadable file", () => {
            expect(isFile("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isFile("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isFile("https://github.com/notifications")).to.be.false;
            expect(isFile("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isFile("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isFile("https://github.com/settings/appearance/")).to.be.false;
            expect(isFile("https://github.com/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.false;
            expect(isFile("http://github.com/Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.false;
        });

        it("returns false if relative url doesn't point to any downloadable file", () => {
            expect(isFile("Kir-Antipov")).to.be.false;
            expect(isFile("/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isFile("/notifications")).to.be.false;
            expect(isFile("notifications/Kir-Antipov/")).to.be.false;
            expect(isFile("/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isFile("/settings/appearance/")).to.be.false;
            expect(isFile("/Kir-Antipov/GitHub-Defreshed/blob/master/LICENSE.md")).to.be.false;
            expect(isFile("Kir-Antipov/GitHub-Defreshed/blob/development/src/utils/convert-to-async.ts")).to.be.false;
        });
    });

    describe("isProject", () => {
        const { isProject } = detector;

        it("returns true if absolute url points to the project board", () => {
            expect(isProject("https://github.com/Kir-Antipov/GitHub-Defreshed/projects/1")).to.be.true;
            expect(isProject("https://github.com/dotnet/csharplang/projects/2/")).to.be.true;
            expect(isProject("http://github.com/proteriax/jsx-dom/projects/3/")).to.be.true;
        });

        it("returns true if relative url points to the project board", () => {
            expect(isProject("Kir-Antipov/GitHub-Defreshed/projects/1")).to.be.true;
            expect(isProject("dotnet/csharplang/projects/2/")).to.be.true;
            expect(isProject("/proteriax/jsx-dom/projects/3/")).to.be.true;
        });

        it("returns false if absolute url doesn't point to the project board", () => {
            expect(isProject("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isProject("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isProject("https://github.com/notifications")).to.be.false;
            expect(isProject("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isProject("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isProject("https://github.com/settings/appearance/")).to.be.false;
            expect(isProject("https://github.com/settings/profile/Kir-Antipov")).to.be.false;
        });

        it("returns false if relative url doesn't point to the project board", () => {
            expect(isProject("/Kir-Antipov/")).to.be.false;
            expect(isProject("Kir-Antipov/GitHub-Defreshed/tree")).to.be.false;
            expect(isProject("notifications")).to.be.false;
            expect(isProject("/notifications/Kir-Antipov")).to.be.false;
            expect(isProject("notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isProject("/settings/appearance/")).to.be.false;
            expect(isProject("settings/profile/Kir-Antipov")).to.be.false;
        });
    });

    describe("isAnchor", () => {
        const { isAnchor } = detector;

        it("returns true if absolute url points to anchor", () => {
            expect(isAnchor("https://github.com/Kir-Antipov/GitHub-Defreshed#readme")).to.be.true;
            expect(isAnchor("https://github.com/Kir-Antipov#js-contribution-activity")).to.be.true;
            expect(isAnchor("https://github.com/Kir-Antipov#js-contribution-activity?q=1")).to.be.true;
        });

        it("returns true if relative url points to anchor", () => {
            expect(isAnchor("/Kir-Antipov/GitHub-Defreshed#readme")).to.be.true;
            expect(isAnchor("/Kir-Antipov#js-contribution-activity")).to.be.true;
            expect(isAnchor("Kir-Antipov#js-contribution-activity?q=1")).to.be.true;
            expect(isAnchor("#readme")).to.be.true;
        });

        it("returns false if absolute url doesn't point to anchor", () => {
            expect(isAnchor("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isAnchor("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isAnchor("https://github.com/notifications")).to.be.false;
            expect(isAnchor("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isAnchor("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isAnchor("https://github.com/settings/appearance/")).to.be.false;
            expect(isAnchor("https://github.com/settings/profile/Kir-Antipov")).to.be.false;
        });

        it("returns false if relative url doesn't point to anchor", () => {
            expect(isAnchor("/Kir-Antipov/")).to.be.false;
            expect(isAnchor("Kir-Antipov/GitHub-Defreshed/tree")).to.be.false;
            expect(isAnchor("notifications")).to.be.false;
            expect(isAnchor("/notifications/Kir-Antipov")).to.be.false;
            expect(isAnchor("notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isAnchor("/settings/appearance/")).to.be.false;
            expect(isAnchor("settings/profile/Kir-Antipov")).to.be.false;
        });
    });

    describe("isProfileSettings", () => {
        const { isProfileSettings } = detector;

        it("returns true if absolute url points to the profile settings", () => {
            expect(isProfileSettings("https://github.com/settings/profile")).to.be.true;
            expect(isProfileSettings("https://github.com/settings/profile/")).to.be.true;
            expect(isProfileSettings("http://github.com/settings/profile/")).to.be.true;
        });

        it("returns true if relative url points to the profile settings", () => {
            expect(isProfileSettings("settings/profile")).to.be.true;
            expect(isProfileSettings("settings/profile/")).to.be.true;
            expect(isProfileSettings("/settings/profile")).to.be.true;
            expect(isProfileSettings("/settings/profile/")).to.be.true;
        });

        it("returns false if absolute url doesn't point to the profile settings", () => {
            expect(isProfileSettings("https://github.com/Kir-Antipov/")).to.be.false;
            expect(isProfileSettings("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isProfileSettings("https://github.com/notifications")).to.be.false;
            expect(isProfileSettings("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isProfileSettings("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isProfileSettings("https://github.com/settings/appearance/")).to.be.false;
            expect(isProfileSettings("https://github.com/settings/profile/Kir-Antipov")).to.be.false;
        });

        it("returns false if relative url doesn't point to the profile settings", () => {
            expect(isProfileSettings("/Kir-Antipov/")).to.be.false;
            expect(isProfileSettings("Kir-Antipov/GitHub-Defreshed/tree")).to.be.false;
            expect(isProfileSettings("notifications")).to.be.false;
            expect(isProfileSettings("/notifications/Kir-Antipov")).to.be.false;
            expect(isProfileSettings("notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isProfileSettings("/settings/appearance/")).to.be.false;
            expect(isProfileSettings("settings/profile/Kir-Antipov")).to.be.false;
        });
    });

    describe("isProfile", () => {
        const { isProfile } = detector;

        it("returns true if absolute url points to the profile page", () => {
            expect(isProfile("https://github.com/Kir-Antipov")).to.be.true;
            expect(isProfile("https://github.com/An-dz/")).to.be.true;
            expect(isProfile("http://github.com/proteriax/")).to.be.true;
        });

        it("returns true if relative url points to the profile page", () => {
            expect(isProfile("Kir-Antipov")).to.be.true;
            expect(isProfile("/An-dz/")).to.be.true;
            expect(isProfile("proteriax/")).to.be.true;
        });

        it("returns false if absolute url doesn't point to the profile page", () => {
            expect(isProfile("https://github.com/Kir-Antipov/GitHub-Defreshed/tree/")).to.be.false;
            expect(isProfile("https://github.com/settings/")).to.be.false;
            expect(isProfile("https://github.com/notifications")).to.be.false;
            expect(isProfile("https://github.com/notifications/Kir-Antipov")).to.be.false;
            expect(isProfile("https://github.com/notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isProfile("https://github.com/settings/appearance/")).to.be.false;
            expect(isProfile("https://github.com/settings/profile/Kir-Antipov")).to.be.false;
        });

        it("returns false if relative url doesn't point to the profile page", () => {
            expect(isProfile("Kir-Antipov/GitHub-Defreshed/tree")).to.be.false;
            expect(isProfile("/settings/")).to.be.false;
            expect(isProfile("notifications")).to.be.false;
            expect(isProfile("/notifications/Kir-Antipov")).to.be.false;
            expect(isProfile("notifications/Kir-Antipov/tree/master/")).to.be.false;
            expect(isProfile("/settings/appearance/")).to.be.false;
            expect(isProfile("settings/profile/Kir-Antipov")).to.be.false;
        });
    });
});