const filterCoordinates = function (api, string, locations, distance) {
    return new Promise(function (resolve) {
        console.log("Searching coordinates", distance);
        resolve([locations[7], locations[8]]);
    });
};

export default filterCoordinates;