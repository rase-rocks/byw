import { encodeGeoHash, decodeGeoHashToPoint } from "./geo-hash";

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

export { addCoordinates, encodeGeoJsonCoordinates };