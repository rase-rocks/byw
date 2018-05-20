export default function (location) {
    return location.coordinates.map(parseFloat);
}