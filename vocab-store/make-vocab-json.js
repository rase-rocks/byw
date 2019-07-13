const fs = require("fs");

function trim(str) {
    return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}

function json(csv) {

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
                console.warn("Missing ${header}");
            } else {

                obj[header] = header != "tags" 
                ? trim(line) 
                : trim(line).split(" ");

            }

            
        }

        result.push(obj);

    }
    return JSON.stringify(result, null, 4);
}

const csv = fs.readFileSync("./vocab-store/geirfa.csv").toString();
const data = json(csv);

console.log(data);