import fs from "fs";
import path from "path";

import translations from "./translations";

function makeWrite(toPath) {
    return function (allLanguages) {

        const english = allLanguages.english;
        const phrases = Object
            .values(english)
            .join("\n");

        fs.writeFileSync(toPath, phrases, "utf8");
        
    };
}

const filePath = path.join(__dirname, "../", "translation-document.txt"); 

translations()
    .then(makeWrite(filePath));