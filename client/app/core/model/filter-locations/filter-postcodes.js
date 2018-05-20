const filterPostcodes = function (api, string, locations, distance) {
    return new Promise(function (resolve) {
        console.log("Searching postcodes", distance);
        resolve([locations[9], locations[10]]);
    });
};

export default filterPostcodes;