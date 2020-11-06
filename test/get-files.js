import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

function isDirectory(path) {
    return statSync(path).isDirectory();
}

function getDirectories(path) {
    return readdirSync(path)
        .map(name => join(path, name))
        .filter(isDirectory);
}

function isFile(path) {
    return statSync(path).isFile();
}

function getFiles(path) {
    return readdirSync(path)
        .map(name => join(path, name))
        .filter(isFile);
}

export default function getFilesRecursive(path, ext = "js") {

    let dirs = getDirectories(path);
    let files = dirs
        .map(dir => getFilesRecursive(dir))
        .reduce((a, b) => a.concat(b), []);

    return files
        .concat(getFiles(path))
        .filter(f => extname(f) == `.${ext}`);

}