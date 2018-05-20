const types = {
    setLanguage: "com.byw.set-language",
    setLocations: "com.byw.set-locations",
    requestLocations: "com.byw.request-locations",
    filterLocations: "com.byw.filter-locations",
    setFilteredLocations: "com.byw.set-filtered-locations"
};

const setLanguageAction = function (language) {
    return { type: types.setLanguage, payload: language };
};

const setLocationsAction = function (data) {
    return { type: types.setLocations, payload: data };
};

const requestLocationsAction = function () {
    return { type: types.requestLocations, payload: {} };
};

const filterLocationsAction = function (string) {
    return { type: types.filterLocations, payload: string };
};

const setFilteredLocationsAction = function (data) {
    return { type: types.setFilteredLocations, payload: data };
};

export {
    types,
    setLanguageAction,
    setLocationsAction,
    requestLocationsAction,
    filterLocationsAction,
    setFilteredLocationsAction
};