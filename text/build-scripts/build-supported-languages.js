import fs from "fs";
import path from "path";

import supportedLanguages from "./supported-languages";
import codeCompletionObject from "./code-completion-object";

function write(languages, toPath) {

    const langaugesAsJS = codeCompletionObject(languages);
    const script = `// This file is created by the build system and should not be manually edited or changes
// will be lost.

// It is used to allow code completion for supported languages.

export default ${langaugesAsJS};
`;

    fs.writeFileSync(toPath, script, "utf8");
}

function makeWrite(toPath) {
    return function (languages) {
        write(languages, toPath);
    };
}

const filePath = path.join(__dirname, "../../", "client", "app", "core", "text", "supported-languages.js"); // Expect this folder to exist

supportedLanguages()
    .then(makeWrite(filePath));