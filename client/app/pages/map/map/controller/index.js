import { addTileLayer } from "./add-layers";
import { initialCoords, SHOW_ZOOM } from "../constants";
import { makeUpdateMap } from "./update";
import events from "./leaflet-events";
import toMarkerCoords from "../../../../core/model/geojson-coordinates-to-marker-coordinates";

const setPoint = function (map, location, zoom) {
    map.setView(toMarkerCoords(location.coordinates), zoom || SHOW_ZOOM);
};

const makeLocatorMarker = function (leaflet, group, onLocatorDragend, coordinate = initialCoords) {
    return leaflet.marker(toMarkerCoords(coordinate), { draggable: true })
        .on(events.dragend, onLocatorDragend)
        .addTo(group);
};

const makeUpdateLocatorMarker = function (marker, group) {
    return function (showMarker, coordinate = initialCoords) {

        group.bringToFront();
        marker.setOpacity((showMarker) ? 1 : 0);

        if (coordinate) marker.setLatLng(toMarkerCoords(coordinate));

    };
};

const makeController = function (doc, leaflet, mapId, initialProps) {

    const {
        locations,
        filteredResults,
        selectedLocation,
        onShowLocation,
        onReview,
        onLocatorDragend,
        showsLocatorMarker,
        coordinate,
        markerIconOverride
    } = initialProps;

    let map = leaflet.map(mapId);
    map.setView(initialCoords, 9);

    addTileLayer(leaflet, map);

    const _markerGroup = leaflet.featureGroup().addTo(map);
    const _locatorGroup = leaflet.featureGroup().addTo(map);
    const _markerCache = {};
    const _optsCache = {};
    const _divIconCache = {};

    const _locatorMarker = makeLocatorMarker(leaflet, _locatorGroup, onLocatorDragend, coordinate);

    const updateMap = makeUpdateMap(leaflet,
        map,
        _markerGroup,
        _markerCache,
        _optsCache,
        _divIconCache);

    const updateLocatorMarker = makeUpdateLocatorMarker(_locatorMarker, _locatorGroup);

    updateMap(locations,
        filteredResults,
        selectedLocation,
        onShowLocation,
        onReview,
        markerIconOverride);

    updateLocatorMarker(showsLocatorMarker, coordinate);

    return {
        props: function (props) {
            if (props) {
                updateMap(props.locations,
                    props.filteredResults,
                    props.selectedLocation,
                    props.onShowLocation,
                    props.onReview,
                    props.markerIconOverride);

                if (props.selectedLocation) {
                    setPoint(map, props.selectedLocation);
                }

                updateLocatorMarker(props.showsLocatorMarker, props.coordinate);
                return;
            }
        },
        fitTo: function (locations) {
            const coordinates = locations.map(loc => toMarkerCoords(loc.coordinates));
            const bounds = leaflet.latLngBounds(coordinates);
            map.fitBounds(bounds);
        },
        show: function (coordinate, zoom = SHOW_ZOOM) {
            if (!coordinate) { return; }
            map.setView(toMarkerCoords(coordinate), zoom);

        },
        removeMap: function () {
            const mapElement = doc.getElementById(mapId);
            mapElement.remove();
            map = undefined;
        }
    };
};

export default makeController;