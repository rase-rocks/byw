export default function (marker) {
    const latLng = marker.getLatLng();
    return [
        latLng.lng,
        latLng.lat
    ];
}