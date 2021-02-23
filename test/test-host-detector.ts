import { expect } from "chai";
import * as detector from "@utils/host-detector";

changeUrl("https://github.com/Kir-Antipov/GitHub-Defreshed");

describe("@utils/host-detector", () => {
    describe("isAbsoluteURL", () => {
        const { isAbsoluteURL } = detector;

        it("returns true if url is absolute", () => {
            expect(isAbsoluteURL("https://github.com/")).to.be.true;
            expect(isAbsoluteURL("http://www.github.com")).to.be.true;
            expect(isAbsoluteURL("https://github.com/Kir-Antipov/GitHub-Defreshed")).to.be.true;
            expect(isAbsoluteURL("https://github.com/Kir-Antipov/GitHub-Defreshed#readme")).to.be.true;
        });

        it("returns false if url is not absolute", () => {
            expect(isAbsoluteURL("GitHub-Defreshed")).to.be.false;
            expect(isAbsoluteURL("/GitHub-Defreshed")).to.be.false;
            expect(isAbsoluteURL("#anchor")).to.be.false;
        });

        it("returns false if input string is not url", () => {
            expect(isAbsoluteURL("This is not url")).to.be.false;
        });
    });

    describe("getAbsoluteURL", () => {
        const { getAbsoluteURL, isAbsoluteURL } = detector;

        it("creates absolute url", () => {
            const urlString = getAbsoluteURL("search", "google.com", "https:");
            expect(isAbsoluteURL(urlString)).to.be.true;

            const url = new URL(urlString);
            expect(url.protocol).to.equal("https:");
            expect(url.host).to.equal("google.com");
            expect(url.hostname).to.equal("google.com");
            expect(url.port).to.equal("");
            expect(url.pathname).to.equal("/search");

        });

        it("creates absolute url based on current location", () => {
            const urlString = getAbsoluteURL("path");
            expect(isAbsoluteURL(urlString)).to.be.true;

            const url = new URL(urlString);
            expect(url.protocol).to.equal(location.protocol);
            expect(url.host).to.equal(location.host);
            expect(url.hostname).to.equal(location.hostname);
            expect(url.port).to.equal(location.port);
            expect(url.pathname).to.equal("/path");
        });

        it("doesn't change url if it's already absolute", () => {
            const url = getAbsoluteURL("https://google.com");
            expect(url).to.equal("https://google.com");
        });
    });

    describe("isGivenHost", () => {
        const { isGivenHost } = detector;

        it("returns true if location's host is equal to the given one", () => {
            expect(isGivenHost("https://github.com/Kir-Antipov/GitHub-Defreshed", "github.com")).to.be.true;
            expect(isGivenHost("https://google.com/search", "google.com")).to.be.true;
            expect(isGivenHost("https://google.com/", "google.com")).to.be.true;
        });

        it("returns false if location's host isn't equal to the given one", () => {
            expect(isGivenHost("https://github.com/Kir-Antipov/GitHub-Defreshed", "google.com")).to.be.false;
            expect(isGivenHost("https://google.com/search", "github.com")).to.be.false;
            expect(isGivenHost("https://google.com/", "github.com")).to.be.false;
        });

        it("returns true if location is relative and host is equal to current", () => {
            expect(isGivenHost("/", "github.com")).to.be.true;
            expect(isGivenHost("/Kir-Antipov", "github.com")).to.be.true;
            expect(isGivenHost("/Kir-Antipov/GitHub-Defreshed", "github.com")).to.be.true;
        });

        it("returns false if location is relative and host isn't equal to current", () => {
            expect(isGivenHost("/", "google.com")).to.be.false;
            expect(isGivenHost("/Kir-Antipov", "google.com")).to.be.false;
            expect(isGivenHost("/Kir-Antipov/GitHub-Defreshed", "google.com")).to.be.false;
        });
    });

    describe("isSameSiteURL", () => {
        const { isSameSiteURL } = detector;

        it("returns true if absolute url belongs to current host", () => {
            expect(isSameSiteURL("https://github.com/")).to.be.true;
            expect(isSameSiteURL("https://github.com/Kir-Antipov")).to.be.true;
            expect(isSameSiteURL("https://github.com/Kir-Antipov/GitHub-Defreshed")).to.be.true;
        });

        it("returns true if url is relative", () => {
            expect(isSameSiteURL("/")).to.be.true;
            expect(isSameSiteURL("/Kir-Antipov")).to.be.true;
            expect(isSameSiteURL("/Kir-Antipov/GitHub-Defreshed")).to.be.true;
        });

        it("returns false if absolute url doesn't belong to current host", () => {
            expect(isSameSiteURL("https://google.com/")).to.be.false;
            expect(isSameSiteURL("https://google.com/search")).to.be.false;
            expect(isSameSiteURL("https://google.com/search/Shrek")).to.be.false;
        });
    });

    describe("isGitHub", () => {
        const { isGitHub } = detector;

        it("returns true if absolute url belongs to GitHub", () => {
            expect(isGitHub("https://github.com/")).to.be.true;
            expect(isGitHub("https://github.com/Kir-Antipov")).to.be.true;
            expect(isGitHub("https://github.com/Kir-Antipov/GitHub-Defreshed")).to.be.true;
        });

        it("returns false if absolute url doesn't belong to GitHub", () => {
            expect(isGitHub("https://google.com/")).to.be.false;
            expect(isGitHub("https://google.com/search")).to.be.false;
            expect(isGitHub("https://google.com/search/Shrek")).to.be.false;
        });

        it("returns true if url is relative and current host belongs to GitHub", () => {
            expect(isGitHub("/")).to.be.true;
            expect(isGitHub("/Kir-Antipov")).to.be.true;
            expect(isGitHub("/Kir-Antipov/GitHub-Defreshed")).to.be.true;
        });

        it("returns false if url is relative and current host doesn't belong to GitHub", () => {
            changeUrl("https://gist.github.com/Kir-Antipov");

            expect(isGitHub("/")).to.be.false;
            expect(isGitHub("/Kir-Antipov")).to.be.false;
            expect(isGitHub("/Kir-Antipov/GitHub-Defreshed")).to.be.false;

            changeUrl("https://github.com/Kir-Antipov/GitHub-Defreshed");
        });
    });

    describe("isGitHubGist", () => {
        const { isGitHubGist } = detector;

        it("returns true if absolute url belongs to GitHubGist", () => {
            expect(isGitHubGist("https://gist.github.com/")).to.be.true;
            expect(isGitHubGist("https://gist.github.com/Kir-Antipov")).to.be.true;
            expect(isGitHubGist("https://gist.github.com/Kir-Antipov/89f2ecb9d0e2a43cffe5f2f615882381")).to.be.true;
        });

        it("returns false if absolute url doesn't belong to GitHubGist", () => {
            expect(isGitHubGist("https://google.com/")).to.be.false;
            expect(isGitHubGist("https://google.com/search")).to.be.false;
            expect(isGitHubGist("https://google.com/search/Shrek")).to.be.false;
        });

        it("returns true if url is relative and current host belongs to GitHubGist", () => {
            changeUrl("https://gist.github.com/Kir-Antipov");

            expect(isGitHubGist("/")).to.be.true;
            expect(isGitHubGist("/Kir-Antipov")).to.be.true;
            expect(isGitHubGist("/Kir-Antipov/GitHub-Defreshed")).to.be.true;

            changeUrl("https://github.com/Kir-Antipov/GitHub-Defreshed");
        });

        it("returns false if url is relative and current host doesn't belong to GitHubGist", () => {
            expect(isGitHubGist("/")).to.be.false;
            expect(isGitHubGist("/Kir-Antipov")).to.be.false;
            expect(isGitHubGist("/Kir-Antipov/GitHub-Defreshed")).to.be.false;
        });
    });
});