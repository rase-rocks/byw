/*
* Takes a Leaflet.js LatLng and returns a GeoJson coordinate ([lng, lat])
*
*/

export default function (LatLng) {
    return [parseFloat(LatLng.lng), parseFloat(LatLng.lat)];
}