import fs from "fs";
import path from "path";

import translations from "./translations";

function quotedHint(value) {
    return value.startsWith("\"") ? value : `"${value}"`;
}

function makeWrite(toPath) {
    return function (allLanguages) {

        const english = allLanguages.english;
        const csv = Object
            .keys(english)
            .map(key => `${key}, ${quotedHint(english[key])},`)
            .join("\n");

        const fileData = `key,translatorHint,value\n${csv}`;

        fs.writeFileSync(toPath, fileData, "utf8");
        
    };
}

const filePath = path.join(__dirname, "../", "translation-template.csv"); 

translations()
    .then(makeWrite(filePath));