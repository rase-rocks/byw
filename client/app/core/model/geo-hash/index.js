import { encodeGeoHash, decodeGeoHashToPoint } from "./geo-hash";
import match from "./geo-match";

const addCoordinates = function (location) {
    const point = decodeGeoHashToPoint(location.coordinateHash);
    return Object.assign(
        {}, 
        location,
        {coordinates: [point.longitude, point.latitude]}
    );
};

const encodeGeoJsonCoordinates = function (coordinates) {
    return encodeGeoHash(coordinates[1], coordinates[0]);
};

const coordinateFromHash = function (hash) {
    const point = decodeGeoHashToPoint(hash);
    return [point.longitude, point.latitude];
};

export { 
    addCoordinates, 
    encodeGeoJsonCoordinates,
    coordinateFromHash,
    match
};