import { encodeGeoHash } from "../client/app/core/model/geo-hash/geo-hash";

const parseCoodinateHash = function (geoJsonCoordinates) {
    return encodeGeoHash(geoJsonCoordinates[1], geoJsonCoordinates[0]);
};

export default parseCoodinateHash;