import { encodeGeoJsonCoordinates, match, coordinateFromHash } from "./geo-hash";
import { haversineDistance } from "./haversine-distance";

export const geoHashMatch = function (locations, coordinate, precision) {
    let isFound = undefined;
    const coordinateHash = encodeGeoJsonCoordinates(coordinate);

    for (let i = 0; i < locations.length; i++) {
        const locationHash = locations[i].coordinateHash;

        if (match(locationHash, coordinateHash, precision)) {
            isFound = locations[i];
            break;
        }
    }

    return isFound;
};

export default function (locations, coordinate, precision = 8, radius = 0.01) {

    let match = geoHashMatch(locations, coordinate, precision);
    if (!match) { return false; }

    return haversineDistance(coordinateFromHash(match.coordinateHash),
        coordinate) <= radius;
}