const spaceRe = / /g;
const numbersRe = /[^0-9]+/g;

const removeWhitespace = function (str) {
    return str.replace(spaceRe, "");
};

const removeNoneNumbers = function (str) {
    return str.replace(numbersRe, "");
};

const parseStringToNumber = function (str) {
    if (!str || str === "") { return 0; }
    return parseFloat(str);
};

const toNumbers = function (str = "") {
    return str.split("-")
        .map(removeWhitespace)
        .map(removeNoneNumbers)
        .map(parseStringToNumber);
};

const sum = function (accumulator, current) {
    return accumulator + current;
};

const mean = function (values) {
    if (!values || values.length === 0) { return 0; }
    const total = values.reduce(sum, 0);
    return total / values.length;
};

const parseCategory = function (categoryStr) {

    const values = toNumbers(categoryStr);

    if (!values || values.length === 0) {
        return 0;
    }
    return (values.length === 1)
        ? values[0]
        : mean(values);
};

module.exports = parseCategory;