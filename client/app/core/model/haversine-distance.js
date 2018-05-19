const sin = Math.sin;
const cos = Math.cos;
const atan2 = Math.atan2;
const sqrt = Math.sqrt;

const radians = makeDegToRad();

function makeDegToRad() {
    const multiplier = Math.PI / 180;
    return function (deg) {
        return deg * multiplier;
    };
}

const LAT = 1;
const LNG = 0;

/*
* Takes an array of shape:
* [
*   longitude: <Number>,
*   latitude: <Number>
* ]
* as the coordinate argument
*/
function haversineDistance(coordinate1, coordinate2) {

    const R = 6371;
    const dLat = radians(coordinate2[LAT] - coordinate1[LAT]);
    const dLon = radians(coordinate2[LNG] - coordinate1[LNG]);
    const a =
        sin(dLat / 2) * sin(dLat / 2) +
        cos(radians(coordinate1[LAT])) * cos(radians(coordinate2[LAT])) *
        sin(dLon / 2) * sin(dLon / 2);
    const c = 2 * atan2(sqrt(a), sqrt(1 - a));

    return R * c;
}

// Simplified sorting function does not allow for equal distance but does
// cut out another haversineDistance call to determine greater or equal to
// should be good enough for our purposes
//
// The coordinateFn is passed to allow non GeoJson objects with coordinate
// arrays (like our data source) to use the same sorting function
// The coordinateFn should take an object of the intended sort type and return
// a an array of numbers encoding the longitude and latitude in that order 
// as per GeoJson
function makeArraySort(basePoint, coordinateFn) {

    const center = coordinateFn(basePoint);

    return function compare(a, b) {
        
        const coordinateA = coordinateFn(a);
        const coordinateB = coordinateFn(b);

        if (haversineDistance(center, coordinateA) < haversineDistance(center, coordinateB)) {
            return -1;
        }
        return 1;
    };
}

export { haversineDistance, makeArraySort };