import { title, description, keywords } from "../../../build-settings/build-settings";
import capitalizeFirstLetter from "../core/model/string-capitalize-first-letter";
import text from "../core/text/data";
import supportedLanguages from "../core/text/supported-languages";

const route = {
    home: "/",
    map: "/map",
    vocabulary: "/vocabulary",
    about: "/about",
    submit: "/submit"
};

const privacyUrl = "/privacy";

// Include titleTag for default English language page title for `seo-hacks`

function removeSlashPrefix(url) {
    return url.slice(1);
}

function nameFrom(url) {
    const namePart = removeSlashPrefix(url);
    return namePart === "" ? "Home" : capitalizeFirstLetter(namePart);
}

function pageTitleKey(url) {
    const name = nameFrom(url);
    return `pageTitleKey${name}`;
}

function pageTitleTagKey(url) {
    const name = nameFrom(url);
    return `pageTitleTagKey${name}`;
}

const routes = [
    {
        url: route.home,
        title: "Home",
        pageTitleTextKey: pageTitleKey(route.home),
        titleTag: title,
        pageTitleTagTextKey: pageTitleTagKey(route.home),
        descriptionTag: description,
        keywordsTag: keywords
    },
    {
        url: route.map,
        title: "Map",
        pageTitleTextKey: pageTitleKey(route.map),
        titleTag: "BYW | Map",
        pageTitleTagTextKey: pageTitleTagKey(route.map),
        descriptionTag: "Show places on a map where it is likely you can use the Welsh language",
        keywordsTag: "show,places,welsh,cymraeg,map,language,likely,where,can,i,use"
    },
    {
        url: route.vocabulary,
        title: "Vocab",
        pageTitleTextKey: pageTitleKey(route.vocabulary),
        titleTag: "BYW | Vocabulary",
        pageTitleTagTextKey: pageTitleTagKey(route.vocabulary),
        descriptionTag: "A searchable dictionary of commonly used terms and phrases in English and Welsh",
        keywordsTag: "search,vocabulary,dictionary,welsh,cymraeg,phrase,term"
    },
    {
        url: route.about,
        title: "About",
        pageTitleTextKey: pageTitleKey(route.about),
        titleTag: "BYW | About",
        pageTitleTagTextKey: pageTitleTagKey(route.about),
        descriptionTag: "A short description of this project and its aims along with some other information",
        keywordsTag: "welsh,cymraeg,language,map,vocabulary,about,open,source"
    },
    {
        url: route.submit,
        title: "Submit",
        pageTitleTextKey: pageTitleKey(route.submit),
        titleTag: "BYW | Submit",
        pageTitleTagTextKey: pageTitleTagKey(route.submit),
        descriptionTag: "Submit your findings about places that use the Welsh language to help others find them",
        keywordsTag: "submit,review,welsh,cymraeg,cymru,shop,public,places,restaurant,cafe"
    }
];

const noneNavRoutes = [
    {
        url: privacyUrl,
        title: "Privacy",
        pageTitleTextKey: pageTitleKey(privacyUrl),
        titleTag: "BYW | Privacy",
        pageTitleTagTextKey: pageTitleTagKey(privacyUrl),
        descriptionTag: "How your privacy is maintained during your visit to this website",
        keywordsTag: "privacy,policy,welsh,cymraeg,website,front,end,client,api"
    }
];

const notFound = {
    titleTag: "BYW | Not Found",
    pageTitleTagTextKey: pageTitleTagKey("/404"),
    descriptionTag: "Oops, the page you are looking for has not been found",
    keywordsTag: "not,found,404,welsh,cymraeg,learn,translate,find"
};

const requiredTextKeysTitle = [...routes, ...noneNavRoutes].map(route => route.pageTitleTextKey);
const requiredTextKeysTitleTag = [...routes, ...noneNavRoutes, notFound].map(route => route.pageTitleTagTextKey);

const pathnameIs404 = function (pathname) {
    return pathname === "/404.html" || pathname === "/404";
};

const defaultOrNotFound = function (pathname, tag, fallback) {
    if (pathnameIs404(pathname)) {
        return notFound[tag] || fallback;
    }
    return fallback;
};

const defaultTitle = function (pathname, fallback) {
    return pathnameIs404(pathname)
        ? notFound.titleTag || fallback
        : fallback;
};

const routeFinder = function (pathname) {
    return function (element) {
        return element.url === pathname;
    };
};

const findRoute = function (pathname) {

    const finder = routeFinder(pathname);

    const navRoute = routes.find(finder);
    if (navRoute) { return navRoute; }

    const noneNavRoute = noneNavRoutes.find(finder);
    return noneNavRoute;

};

const canonicalPath = function (pathname) {
    const path = findRoute(pathname);
    return path === undefined ? "/404.html" : path.url;
};

const titleTag = function (pathname, language = supportedLanguages.english) {

    const path = findRoute(pathname);

    if (!path) { return defaultTitle(pathname, notFound.titleTag); }

    const translatedText = text[language];

    return translatedText[path.pageTitleTagTextKey] === undefined
        ? defaultTitle(pathname, title)
        : translatedText[path.pageTitleTagTextKey];

};

const keywordsTag = function (pathname) {
    const path = findRoute(pathname);
    return path == undefined 
        ? defaultOrNotFound(pathname, "keywordsTag", notFound.keywordsTag) 
        : path.keywordsTag;
};

const descriptionTag = function (pathname) {
    const path = findRoute(pathname);
    return path === undefined 
        ? defaultOrNotFound(pathname, "descriptionTag", notFound.descriptionTag) 
        : path.descriptionTag;
};

export default routes;
export { 
    canonicalPath, 
    titleTag, 
    keywordsTag, 
    descriptionTag, 
    notFound, 
    noneNavRoutes, 
    route,
    requiredTextKeysTitle,
    requiredTextKeysTitleTag
};