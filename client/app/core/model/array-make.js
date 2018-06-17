const makeArray = function (count, repeating) {
    return Array.apply(null, Array(count)).map((idx, i) => {
        return repeating(i);
    });
};

export default makeArray;