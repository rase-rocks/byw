const types = {
    setLanguage: "com.byw.set-language",
    setLocations: "com.byw.set-locations",
    requestLocations: "com.byw.request-locations"
};

const setLanguageAction = function (language) {
    return { type: types.setLanguage, payload: language };
};

const setLocationsAction = function (data) {
    return  { type: types.setLocations, payload: data };
};

const requestLocationsAction = function () {
    return { type: types.requestLocations, payload: {} };
};

export { 
    types, 
    setLanguageAction,
    setLocationsAction,
    requestLocationsAction
};