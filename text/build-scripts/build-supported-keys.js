import fs from "fs";
import path from "path";

import codeCompletionObject from "./code-completion-object";
import supportedKeys from "./supported-keys";

function write(keys, toPath) {

    const keysAsJS = codeCompletionObject(keys);
    const script = `// This file is created by the build system and should not be manually edited or changes
// will be lost.

// It is created to allow for code completion of the supported keys to access the page
// text translations. Its prescence assists the page component author to locate the relevant
// piece of user facing text. It also means that components that attempt to access none
// existing keys will be found at build time, rather than runtime.

export default ${keysAsJS};
`;
    fs.writeFileSync(toPath, script, "utf8");
}

function makeWrite(toPath) {
    return function (keys) {
        write(keys, toPath);
    };
}

const filePath = path.join(__dirname, "../../", "client", "app", "core", "text", "supported-keys.js"); // Expect this folder to exist

supportedKeys()
    .then(makeWrite(filePath));