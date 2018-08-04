const types = {
    setLanguage: "com.byw.set-language",
    setLocations: "com.byw.set-locations",
    requestLocations: "com.byw.request-locations",
    filterLocations: "com.byw.filter-locations",
    setSearchText: "com.byw.set-search-text",
    setFilteredLocations: "com.byw.set-filtered-locations",
    filterLocationsByPolygon: "com.byw.filter-locations-by-polygon",
    setViewLocation: "com.byw.set-view-location",
    setFormData: "com.byw.set-form-data",
    updateForm: "com.byw.update-form",
    clearForm: "com.byw.clear-form",
    submitForm: "com.byw-submit-form",
    setLocatorSearchText: "com.byw-set-locactor-search-text",
    setLocatorCoordinate: "com.byw-set-locator-coordinate",
    addSubmission: "com.byw-add-submission",
    updateSubmissionStatus: "com.byw-update-submission-status"
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

const setSearchTextAction = function (text = "") {
    return { type: types.setSearchText, payload: text };
};

const filterLocationsAction = function (filterString, filterDistance = 20) {
    return { type: types.filterLocations, payload: { filterString, filterDistance } };
};

const filterLocationsByPolygon = function (polygon) {
    return { type: types.filterLocationsByPolygon, payload: polygon };
};

const setFilteredLocationsAction = function (locations) {
    return { type: types.setFilteredLocations, payload: locations };
};

const setViewLocationAction = function (location) {
    return { type: types.setViewLocation, payload: location };
};

const setFormDataAction = function (key, value) {
    return { type: types.setFormData, payload: { key, value } };
};

const updateFormAction = function (form) {
    return { type: types.updateForm, payload: form };
};

const clearFormAction = function () {
    return { type: types.clearForm, payload: {} };
};

const submitFormAction = function () {
    return { type: types.submitForm, payload: {} };
};

const setLocatorSearchTextAction = function (text) {
    return { type: types.setLocatorSearchText, payload: text };
};

const setLocatorCoordinateAction = function (coordinate) {
    return { type: types.setLocatorCoordinate, payload: coordinate };
};

const addSubmissionAction = function (submission) {
    return { type: types.addSubmission, payload: submission };
};

const updateSubmissionStatusAction = function (submission, status) {
    return { type: types.updateSubmissionStatus, payload: { submission, status } };
};

export {
    types,
    setLanguageAction,
    setLocationsAction,
    requestLocationsAction,
    filterLocationsAction,
    filterLocationsByPolygon,
    setSearchTextAction,
    setFilteredLocationsAction,
    setViewLocationAction,
    setFormDataAction,
    updateFormAction,
    clearFormAction,
    submitFormAction,
    setLocatorSearchTextAction,
    setLocatorCoordinateAction,
    addSubmissionAction,
    updateSubmissionStatusAction
};