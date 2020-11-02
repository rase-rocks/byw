const fs = require("fs");
const path = require("path");
const defaultTransform = require("../default-transform").default;

const languagesPath = path.join(__dirname, "../languages");

function completeTranslation(identifier, translation) {
    return { identifier, translation };
}

function transformFor(languagePath) {
    if (fs.existsSync(path.join(languagePath, "index.js"))) {
        return require(languagePath).default;
    } else {
        return defaultTransform;
    }
}

function translationFor(language) {

    const currentLanguagePath = path.join(languagesPath, language);
    const transform = transformFor(currentLanguagePath);

    return transform(language, currentLanguagePath)
        .then((translationText) => completeTranslation(language, translationText));
}

function toTranslationsObject(array) {
    return array.reduce((acc, translation) => {
        acc[translation.identifier] = translation.translation.text; 
        return acc;
    }, {});
}

export default function () {
    return new Promise(function (resolve) {
        fs.readdir(languagesPath, function (err, languageFolders) {

            if (err) { console.error("Unable to find translations. Check documentation"); return; }
        
            Promise.all(languageFolders.map(translationFor))
                .then(toTranslationsObject)
                .then(resolve);
        
        });
    });
}
