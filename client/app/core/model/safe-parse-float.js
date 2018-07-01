const safeParseFloat = function (value) {
    const result = parseFloat(value);
    return (!isNaN(result))
        ? result
        : 0;
};

module.exports = safeParseFloat;