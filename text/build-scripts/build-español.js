// This assumes that the `translation-document.txt` file has been uploaded to google translate and
// the resulting translation saved as `translation.txt` in the `español` folder.
//
// From there a `translation.csv` is made ready for the next stage in the user facing text build process.
// 
// This example is included as a demo for how to use the google translate service for this task, without
// having to sign up for Google Cloud API and generate API keys and so on.
//
// The quality of translation may not be very high, sorry about that, but I have no knowledge of Italian
// so I cannot improve upon it. It should however serve as a starting point for anybody else who does have
// knowledge of this language and demo's the technique

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

const folder = path.join(__dirname, "../", "languages", "español");
const filePath = path.join(folder, "translation.csv"); 

translations()
    .then(makeWrite(folder, filePath));