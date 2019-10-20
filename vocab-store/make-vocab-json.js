const fs = require("fs");

function hash(obj) {

    let string = JSON.stringify(obj);

    var hash = 5381,
        i = string.length;

    while (i) {
        hash = (hash * 33) ^ string.charCodeAt(--i);
    }

    return `${hash >>> 0}`;

}

function trim(str) {
    return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}

function json(csv) {

    return new Promise(function (resolve) {

        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {

            var obj = {};
            var currentLine = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {

                const header = headers[j];
                const line = currentLine[j];

                if (line == "undefined") {

                    console.warn(`Missing ${header}`);

                } else {

                    obj[header] = header != "tags"
                        ? trim(line)
                        : trim(line).split(" ");

                }

            }

            obj.id = hash(obj);

            result.push(obj);

        }

        resolve(result);

    });

}

function sortArray(array) {
    return new Promise(function (resolve) {
        const sorted = array.sort((el, el2) => { return el.en < el2.en ? -1 : 1; });
        resolve(sorted);
    });
}

function toString(jsonObj) {
    return new Promise(function (resolve) {
        resolve(JSON.stringify(jsonObj, null, 4));
    });
}

// const thisFolder = "./geirfa.csv";
const parentFolder = "./vocab-store/geirfa.csv";

const csv = fs.readFileSync(parentFolder).toString();

json(csv)
    .then(sortArray)
    .then(toString)
    .then(console.log);
