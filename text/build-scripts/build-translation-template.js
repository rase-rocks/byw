import fs from "fs";
import path from "path";

import supportedKeys from "./supported-keys";

function write(keys, toPath) {
    const script = `key,value\n${keys.join(",\n")},`;
    fs.writeFileSync(toPath, script, "utf8");
}

function makeWrite(toPath) {
    return function (keys) {
        write(keys, toPath);
    };
}

const filePath = path.join(__dirname, "../", "translation-template.csv"); 

supportedKeys()
    .then(makeWrite(filePath));