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

/*
* Takes an object of shape:
* {
*   latitude: <Number>
*   longitude: <Number>
* }
* as the coordinate argument
*/
function haversineDistance(coordinate1, coordinate2) {

    const R = 6371;
    const dLat = radians(coordinate2.latitude - coordinate1.latitude);
    const dLon = radians(coordinate2.longitude - coordinate1.longitude);
    const a =
        sin(dLat / 2) * sin(dLat / 2) +
        cos(radians(coordinate1.latitude)) * cos(radians(coordinate2.latitude)) *
        sin(dLon / 2) * sin(dLon / 2);
    const c = 2 * atan2(sqrt(a), sqrt(1 - a));

    return R * c;
}

// Simplified sorting function does not allow for equal distance but does
// cut out another haversineDistance call to determine greater or equal to
// should be good enough for our purposes
function makeArraySort(basePoint) {
    return function compare(a, b) {
        if (haversineDistance(basePoint, a) < haversineDistance(basePoint, b)) {
            return -1;
        }
        return 1;
    };
}

export { haversineDistance, makeArraySort };