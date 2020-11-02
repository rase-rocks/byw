import translations from "./translations";

function supportedKeys(allLanguages) {
    const english = allLanguages.english;
    return Object.keys(english);
}

export default function() {
    return translations()
        .then(supportedKeys);
}