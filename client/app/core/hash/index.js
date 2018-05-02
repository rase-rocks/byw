export default function hash(str = "") {

    let string = str;

    if (typeof str === "number") {
        string = string + "";
    }

    if (typeof str === "object") {
        string = JSON.stringify(str);
    }

    var hash = 5381,
        i = string.length;

    while (i) {
        hash = (hash * 33) ^ string.charCodeAt(--i);
    }

    return `(${hash >>> 0})`;
}

const strHash = function (str) {

    let string = str + "";

    var hash = 5381,
        i = string.length;

    while (i) {
        hash = (hash * 33) ^ string.charCodeAt(--i);
    }

    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
};

export { strHash };