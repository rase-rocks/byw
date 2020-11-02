import translations from "./translations";

function supportedLanguages(allLanguages) {
    return Object.keys(allLanguages);
}

export default function() {
    return translations()
        .then(supportedLanguages);
}