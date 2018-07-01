const clamp = function (value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
};

export default clamp;