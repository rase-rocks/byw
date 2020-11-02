import translations from "./translations";
import fs from "fs";
import path from "path";

function write(translations, toPath) {

    const script = `// This file is created by the build system and should not be manually edited or changes
// will be lost.

// It contains all the user facing text content translated into all the supported languages.
// Therefore App components only need to be passed a language and this text data object 
// via props to be able to render themselves in the user selected language. Components should only use
// supported keys (which are automatically generated for code completion) and therefore do not
// need to have knowledge of any part of the text content and any typos or missing keys will
// be found at build time.

export default ${JSON.stringify(translations, null, 4)};
`;

    fs.writeFileSync(toPath, script, "utf8");
}

function makeWrite(toPath) {
    return function (translations) {
        write(translations, toPath);
    };
}

const filePath = path.join(__dirname, "../../", "client", "app", "core", "text", "data.js"); // Expect this folder to exist

translations()
    .then(makeWrite(filePath));