const filterText = function (api, string, locations, distance) {
    return new Promise(function (resolve) {
        console.log("Searching text", distance);
        resolve([locations[4], locations[6]]);
    });
};

export default filterText;