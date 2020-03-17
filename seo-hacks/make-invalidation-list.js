#! /usr/bin/env node

const fs = require("fs");

const items = fs.readFileSync("./upload-log.txt")
    .toString()
    .split("\n")
    .map(function (line) {
        const tokens = line.split(" ");
        return tokens[3].substring(14);
    })
    .join("\n");

console.log(items);