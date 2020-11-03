const capitalizeWord = function (word) {
    if (!word) { return ""; }
    word = word + "";
    if (word === "") { return ""; }
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export default capitalizeWord;