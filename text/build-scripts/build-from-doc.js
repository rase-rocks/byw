// This assumes that the `translation-document.txt` file has been uploaded to google translate and
// the resulting translation saved as `translation.txt` in the target folder. A `translation.csv`
// empty file should also be created ready to accept the combined content.
//
// It is probably worth running the `build-text-document.js` script to ensure that the translation
// keys and result match up. This may change if some new elements are added etc.
// 
// This example is included as a demo for how to use the google translate service for this task, without
// having to sign up for Google Cloud API and generate API keys and so on.
//
// This is included as a time saver only for using the Google Translate Document service. It is not the
// recommended way of producing a production ready translation, but it will add the basics that can be
// hand tuned later

import fs from "fs";
import path from "path";

import translations from "./translations";
import quotedHint from "./quoted-hint";

function makeWrite(folderPath, toPath) {
    return function (allLanguages) {

        const translatedLines = fs
            .readFileSync(path.join(folderPath, "translation.txt"))
            .toString()
            .split("\n");

        const english = allLanguages.english;
        const csv = Object
            .keys(english)
            .map((key, index) => `${key}, ${quotedHint(english[key])}, ${quotedHint(translatedLines[index])}`)
            .join("\n");

        const fileData = `key,translatorHint,value\n${csv}`;

        fs.writeFileSync(toPath, fileData, "utf8");
        
    };
}

export default function translate(languageName) {
    const folder = path.join(__dirname, "../", "languages", languageName);
    const filePath = path.join(folder, "translation.csv"); 
    
    translations()
        .then(makeWrite(folder, filePath));
}

