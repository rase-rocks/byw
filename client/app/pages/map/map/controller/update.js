import { makeOptsForMarker } from "../../../../core/model/marker-opts";
import toMarkerCoords from "../../../../core/model/geojson-coordinates-to-marker-coordinates";
import { hash } from "../../../../core/model/marker-opts";
import popup from "../popup";

const makeIcon = function (leaflet, optsForMarker, isSelected, isHighlighted, category) {
    const opts = optsForMarker(isSelected,
        isHighlighted,
        category);
    return { icon: leaflet.divIcon(opts) };
};

const locationMarker = function (leaflet,
    location,
    selectedLocation,
    filteredLocations = [],
    optsForMarker,
    divIconCache) {

    const _isSelected = isSelected(location, selectedLocation);
    const _isHighlighted = isUsed(location, filteredLocations);

    const markerIconHash = hash(_isSelected, _isHighlighted, location.category);
    const cachedDivIcon = divIconCache[markerIconHash];

    if (cachedDivIcon) { return cachedDivIcon; }

    const divIcon = makeIcon(leaflet, optsForMarker, _isSelected, _isHighlighted, location.category);
    divIconCache[markerIconHash] = divIcon;

    return divIcon;
};

const isUsed = function (location, filteredLocations) {
    return filteredLocations.indexOf(location) !== -1;
};

const isSelected = function (location, selectedLocation = {}) {
    return location.coordinateHash === selectedLocation.coordinateHash;
};

const updateMarker = function (leaflet,
    marker,
    location,
    filteredLocations,
    selectedLocation,
    optsForMarker,
    divIconCache) {

    const icon = locationMarker(leaflet,
        location,
        selectedLocation,
        filteredLocations,
        optsForMarker,
        divIconCache).icon;

    marker.setIcon(icon);
};

export const makeUpdateMap = function (leaflet, 
    map, 
    markerGroup, 
    markerCache, 
    optsCache, 
    divIconCache) {

    const optsForMarker = makeOptsForMarker(optsCache);

    return function (locations,
        filteredLocations,
        selectedLocation,
        onShowLocation) {

        markerGroup.clearLayers();

        locations.forEach(loc => {

            const cachedMarker = markerCache[loc.coordinateHash];

            if (cachedMarker) {

                updateMarker(leaflet,
                    cachedMarker,
                    loc,
                    filteredLocations,
                    selectedLocation,
                    optsForMarker,
                    divIconCache);

            } else {

                const m = locationMarker(leaflet,
                    loc,
                    selectedLocation,
                    filteredLocations,
                    optsForMarker,
                    divIconCache);

                const marker = leaflet.marker(toMarkerCoords(loc.coordinates), m)
                    .addTo(map)
                    .bindPopup(popup(loc, onShowLocation));

                markerCache[loc.coordinateHash] = marker;
            }

        });

    };
};