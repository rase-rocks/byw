import { title, description, keywords } from "../../../build-settings/build-settings";

const route = {
    home: "/",
    map: "/map",
    vocabulary: "/vocabulary",
    about: "/about",
    submit: "/submit"
};

const routes = [
    {
        url: route.home,
        title: "Home",
        titleTag: title,
        descriptionTag: description,
        keywordsTag: keywords
    },
    {
        url: route.map,
        title: "Map",
        titleTag: "BYW | Map",
        descriptionTag: "Show places on a map where it is likely you can use the Welsh language",
        keywordsTag: "show,places,welsh,cymraeg,map,language,likely,where,can,i,use"
    },
    {
        url: route.vocabulary,
        title: "Vocab",
        titleTag: "BYW | Vocabulary",
        descriptionTag: "A searchable dictionary of commonly used terms and phrases in English and Welsh",
        keywordsTag: "search,vocabulary,dictionary,welsh,cymraeg,phrase,term"
    },
    {
        url: route.about,
        title: "About",
        titleTag: "BYW | About",
        descriptionTag: "A short description of this project and its aims along with some other information",
        keywordsTag: "welsh,cymraeg,language,map,vocabulary,about,open,source"
    },
    {
        url: route.submit,
        title: "Submit",
        titleTag: "BYW | Submit",
        descriptionTag: "Submit your findings about places that use the Welsh language to help others find them",
        keywordsTag: "submit,review,welsh,cymraeg,cymru,shop,public,places,restaurant,cafe"
    }
];

const noneNavRoutes = [
    {
        url: "/privacy",
        title: "Privacy",
        titleTag: "BYW | Privacy",
        descriptionTag: "How your privacy is maintained during your visit to this website",
        keywordsTag: "privacy,policy,welsh,cymraeg,website,front,end,client,api"
    }
];

const notFound = {
    titleTag: "BYW | Not Found",
    descriptionTag: "Oops, the page you are looking for has not been found",
    keywordsTag: "not,found,404,welsh,cymraeg,learn,translate,find"
};

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

const titleTag = function (pathname) {

    const path = findRoute(pathname);

    if (!path) { return defaultTitle(pathname, notFound.titleTag); }

    return path.titleTag === undefined
        ? defaultTitle(pathname, title)
        : path.titleTag;

};

const keywordsTag = function (pathname) {
    const path = findRoute(pathname);
    return path == undefined ? defaultOrNotFound(pathname, "keywordsTag", notFound.keywordsTag) : path.keywordsTag;
};

const descriptionTag = function (pathname) {
    const path = findRoute(pathname);
    return path === undefined ? defaultOrNotFound(pathname, "descriptionTag", notFound.descriptionTag) : path.descriptionTag;
};

export default routes;
export { canonicalPath, titleTag, keywordsTag, descriptionTag, notFound, noneNavRoutes, route };