const sin = Math.sin;
const cos = Math.cos;
const atan2 = Math.atan2;
const sqrt = Math.sqrt;
const asin = Math.asin;

const radians = makeDegToRad();
const degrees = makeRadToDeg();

function makeDegToRad() {
    const multiplier = Math.PI / 180;
    return function (deg) {
        return deg * multiplier;
    };
}

function makeRadToDeg() {
    const multiplier = 180 / Math.PI;
    return function (rad) {
        return rad * multiplier;
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
// The getter is passed to allow non GeoJson objects with coordinate
// arrays (like our data source) to use the same sorting function
// The getter should take an object of the intended sort type and return
// a an array of numbers encoding the longitude and latitude in that order 
// as per GeoJson
function makeArraySort(basePoint, getter) {

    const center = getter(basePoint);

    return function compare(a, b) {
        
        const coordinateA = getter(a);
        const coordinateB = getter(b);

        if (haversineDistance(center, coordinateA) < haversineDistance(center, coordinateB)) {
            return -1;
        }
        return 1;
    };
}

function makeFilter(basePoint, distance, getter) {

    const center = getter(basePoint);

    return function filter(element) {
        return haversineDistance(center, getter(element)) <= distance;
    };

}

const bearing = function (coordinate1, coordinate2) {

    const q1 = radians(coordinate1[LAT]);
    const q2 = radians(coordinate2[LAT]);

    const diffLon = radians(coordinate2[LNG] - coordinate1[LNG]);

    const y = sin(diffLon) * cos(q2);
    const x = cos(q1) * sin(q2) - sin(q1) * cos(q2) * cos(diffLon);
    const rads = atan2(y, x);

    return (degrees(rads) + 360) % 360;
};

const toBackBearing = function (bearing) {
    let result = 0;

    if (bearing >= 180) {
        result = bearing - 180;
    } else {
        result = bearing + 180;
    }

    return result;
};

const destination = function (coordinate, distance, bearing, radius = 6371e3) {
    const angDist = distance / radius;
    const angle = radians(bearing);

    const q1 = radians(coordinate[LAT]);
    const y1 = radians(coordinate[LNG]);

    const sinQ1 = sin(q1);
    const cosQ1 = cos(q1);
    const sinAngDist = sin(angDist);
    const cosAngDist = cos(angDist);
    const sinAngle = sin(angle);
    const cosAngle = cos(angle);

    const sinQ2 = sinQ1 * cosAngDist + cosQ1 * sinAngDist * cosAngle;
    const q2 = asin(sinQ2);
    const y = sinAngle * sinAngDist * cosQ1;
    const x = cosAngDist - sinQ1 * sinQ2;
    const y2 = y1 + atan2(y, x);

    return [degrees(q2), (degrees(y2) + 540) % 360 - 180];
};

export { 
    haversineDistance, 
    bearing, 
    toBackBearing,
    destination,
    makeArraySort, 
    makeFilter 
};