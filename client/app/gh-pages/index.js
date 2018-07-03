import isBrowser from "../core/is-browser";

const hostname = function (window) {
    return window.location.hostname;
};

export const isStagingEntryPoint = function () {
    if (!isBrowser()) { return false; }
    return hostname(window).includes("github"); // Temp fix for gh-pages staging environment
};

export const stageRoute = function (url) {
    return `/byw/${url}`;
};