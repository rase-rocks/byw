const types = {
    setLanguage: "com.byw.set-language"
};

const setLanguageAction = function (language) {
    return { type: types.setLanguage, payload: language };
};

export { types, setLanguageAction };