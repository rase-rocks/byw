import path from "path";
import csv from "csvtojson";

const rawCSVPath = (translationPath) => path.join(translationPath, "translation.csv");

function toTranslationObject(array) {
    return array.reduce(function (acc, pair) {
        acc[pair.key] = pair.value;
        return acc;
    }, {});
}

function makeResolver(identifier, resolve) {
    return function (text) {
        resolve({
            identifier,
            text: toTranslationObject(text)
        });
    };
}

export default function (identifier, translationPath) {

    const csvPath = rawCSVPath(translationPath);

    return new Promise(function (resolve) {

        csv()
            .fromFile(csvPath)
            .then(makeResolver(identifier, resolve));

    });
    
}