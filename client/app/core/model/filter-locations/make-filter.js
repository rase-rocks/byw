export default function (match) {
    return function (api, string, locations) {
        return new Promise(function (resolve) {
            const matches = locations.filter(match(string)) || [];
            resolve(matches);
        });
    };
}