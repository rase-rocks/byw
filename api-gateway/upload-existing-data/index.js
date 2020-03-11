// To run - from this folder:
// node index.js
// Each item is uploaded one at a time following a short pause

const https = require("https");
const fs = require("fs");

const sendInterval = 1500;

function postLocation(location, callback) {

    if (!location) {
        callback(true);
        return;
    }

    const data = JSON.stringify(location);

    console.log("==========");
    console.log("Posting:");
    console.log(data);
    console.log("==========");

    const options = {
        host: "q64w5l7tw9.execute-api.eu-west-1.amazonaws.com",
        port: 443,
        path: "/upload/submit",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data)
        }
    };

    const req = https.request(options, function (res) {
        res.setEncoding("utf8");
        res.on("data", function () {
            callback(false);
        });
    });

    req.write(data);
    req.end();

}

const start = function (locations, interval = sendInterval) {

    let counter = 0;

    const req = function (location) {
        postLocation(location, function (done) {
            if (done) { return; }
            counter += 1;
            setTimeout(function () {
                req(locations[counter]);
            }, interval);
        });
    };

    req(locations[0]);

};

fs.readFile("./data", "utf-8", function (err, data) {
    if (err) {
        console.log("FATAL An error occurred trying to read in the file: " + err);
        process.exit(-2);
    }

    if (data) {
        const results = JSON.parse(data);

        start(results);

    }
    else {
        console.log("No data to post");
        process.exit(-1);
    }
});