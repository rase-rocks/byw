const flatten = function (arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};

const makeFlattener = function (toFlatten) {
    return new Promise(function (resolve) {
        const result = flatten(toFlatten);
        resolve(result);
    });
};

const tokeniseString = function (str) {
    if (!str) { return []; }
    return str.split(" ")
        .map(str => str.replace(/[^a-z0-9+]+/gi, ""))
        .filter(str => str !== "")
        .map(str => str.toLowerCase());
};

const tokeniseLocations = function (locations) {
    return new Promise(function (resolve) {
        const result = locations.map(tokeniseLocation);
        resolve(result);
    });
};

const tokeniseLocation = function (location) {
    return [location.name, location.address].map(tokeniseString);
};

const meta = function (token, count) {
    return {
        token,
        count
    };
};

const toMeta = (acc, token) => {
    if (!acc[token]) { acc[token] = meta(token, 0); }
    acc[token].count += 1;
    return acc;
};

const tokens = function (locations = []) {
    if (locations.length == 0) return Promise.resolve({});
    return tokeniseLocations(locations)
        .then(makeFlattener)
        .then(function (list) {
            return list.reduce(toMeta, {});
        });
};

const index = function (tokensWithCount = {}) {

    const keys = Object.keys(tokensWithCount);
    if (keys.length === 0) return Promise.resolve({words: [], tokens: {}});

    return new Promise(function (resolve) {
        const result = {
            words: keys,
            tokens: tokensWithCount
        };
        resolve(result);
    });
};

const makeIndex = function (locations) {
    return tokens(locations)
        .then(index);
};

const expandSearchTerm = function (search, words = []) {
    return new Promise(function (resolve) {
        const result = words.filter(word => word.includes(search));
        resolve(result);
    });
};

const reduceExpandedTerms = function (index) {
    return function (expandedTerms) {
        return new Promise(function (resolve) {
            const result = expandedTerms.reduce(function (acc, current) {
                acc.push(index.tokens[current]);
                return acc;
            }, []);
            resolve(result);
        });
    };
};

const sortIndexResults = function (tokensAndCount) {
    return new Promise(function (resolve) {
        const result = tokensAndCount.sort(function (a, b) {
            return (a.count < b.count) ? 1 : -1;
        });
        resolve(result);
    });
};

const pickWord = function (sortedResults) {
    return (sortedResults.length > 0) ? sortedResults[0].token : "";
};

const getWord = function (search = "", index) {

    if (!index || !index.words || search == "") { 
        return Promise.resolve(""); 
    }

    return expandSearchTerm(search, index.words)
        .then(reduceExpandedTerms(index))
        .then(sortIndexResults)
        .then(pickWord);
};

export { makeIndex, getWord };