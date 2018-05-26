import toCoordinate from "./lat-lng-to-coordinate";

export default function toPolygon(bounds) {
    return [
        bounds.getNorthWest(),
        bounds.getNorthEast(),
        bounds.getSouthEast(),
        bounds.getSouthWest()
    ].map(toCoordinate);
}