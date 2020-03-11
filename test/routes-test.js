/* global describe it*/

const expect = require("chai").expect;

const buildSettings = require("../build-settings/build-settings");

const canonicalPath = require("../client/app/nav/routes").canonicalPath;
const titleTag = require("../client/app/nav/routes").titleTag;
const descriptionTag = require("../client/app/nav/routes").descriptionTag;
const keywordsTag = require("../client/app/nav/routes").keywordsTag;

const notFound = require("../client/app/nav/routes").notFound;
const noneNavRoutes = require("../client/app/nav/routes").noneNavRoutes;

describe("routes", function () {

    describe("canonicalPath", function () {

        it("returns the expected canonical name for a known route", function () {

            const homeRoute = canonicalPath("/");
            expect(homeRoute).to.be.equal("/");

            const aboutRoute = canonicalPath("/about");
            expect(aboutRoute).to.be.equal("/about");

        });

        it("returns / for unknown routes", function () {

            const noPage = canonicalPath("/nopage");
            expect(noPage).to.be.equal("/404.html");

        });

    });

    describe("titleTag", function () {

        it("returns a title for home as expected", function () {

            const homeTitle = titleTag("/");
            expect(homeTitle).to.equal(buildSettings.title);

        });

        it("returns a title for about", function () {

            const aboutTitle = titleTag("/about");
            expect(aboutTitle.length).to.be.gt(3);

        });

        it("returns home tag for unknown route", function() {

            const homeTitle = titleTag("/myfavouritepuppies");
            expect(homeTitle).to.equal(notFound.titleTag);

        });

        it("returns home tag for not found route", function() {

            const notFoundTitle = titleTag("/404.html");
            expect(notFoundTitle).to.be.equal(notFound.titleTag);

        });

        it("returns home tag for not found route without extension", function() {

            const notFoundTitle = titleTag("/404");
            expect(notFoundTitle).to.be.equal(notFound.titleTag);

        });


        it("returns expected title - privacy", function () {

            const privacyTitle = titleTag("/privacy");
            const privacyRoute = noneNavRoutes.find(element => element.url === "/privacy");

            expect(privacyTitle.toLowerCase()).to.be.equal(privacyRoute.titleTag.toLowerCase());

        });

    });

    describe("keywordsTag", function () {

        it("has more than 5 keywords as default", function () {

            const defaultKeywords = keywordsTag("/").split(",");
            expect(defaultKeywords.length).to.be.gt(5);

        });

        it("returns expected keywords for home", function () {

            const homeKeywords = keywordsTag("/");
            expect(homeKeywords).to.equal(buildSettings.keywords);

        });

        it("returns a list of keywords for about", function () {

            const aboutKeywords = keywordsTag("/about").split(",");
            expect(aboutKeywords.length).to.be.gt(5);

        });

        it("returns home keywords as default", function () {

            const unknownRouteKeywords = keywordsTag("/puppypics");
            expect(unknownRouteKeywords).to.be.equal(notFound.keywordsTag);

        });

        it("returns not found keywords for 404", function () {

            const notFoundKeywords = keywordsTag("/404.html");
            expect(notFoundKeywords).to.be.equal(notFound.keywordsTag);

        });

        it("returns privacy keywords", function() {

            const privacyKeywords = keywordsTag("/privacy");
            const privacyRoute = noneNavRoutes.find(element => element.url === "/privacy");
            expect(privacyKeywords).to.be.equal(privacyRoute.keywordsTag);

        });

    });

    describe("descriptionTag", function () {

        it("returns expected descriptions for home", function () {

            const homeDesc = descriptionTag("/");
            expect(homeDesc).to.be.equal(buildSettings.description);

        });

        it("returns a descriptions for contact", function () {

            const contactDesc = descriptionTag("/contact");
            expect(contactDesc.length).to.be.gt(3);

        });

        it("returns home description as default", function () {

            const homeDesc = descriptionTag("/unknownpage");
            expect(homeDesc).to.be.equal(notFound.descriptionTag);

        });

        it("returns not found description for 404", function () {

            const notFoundDesc = descriptionTag("/404.html");
            expect(notFoundDesc).to.be.equal(notFound.descriptionTag);

        });

        it("returns privacy description", function() {

            const privacyKeywords = descriptionTag("/privacy");
            const privacyRoute = noneNavRoutes.find(element => element.url === "/privacy");
            expect(privacyKeywords).to.be.equal(privacyRoute.descriptionTag);

        });

    });

});