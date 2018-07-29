import { addEventHandlers, addTileLayer } from "./add-layers";
import { filterLocationsByPolygon } from "../../../../core/redux/actions";
import { initialCoords } from "../constants";
import { makeUpdateMap } from "./update";
import toMarkerCoords from "../../../../core/model/geojson-coordinates-to-marker-coordinates";
import toPolygon from "../../../../core/model/lat-lng-bounds-to-polygon";

const setPoint = function (map, location) {
    map.setView(toMarkerCoords(location.coordinates), 18);
};

const makeHandler = function (dispatch) {
    return function (event) {
        const polygon = toPolygon(event.target.getBounds());
        dispatch(filterLocationsByPolygon(polygon));
    };
};

const makeController = function (doc, leaflet, mapId, initialProps) {

    const {
        locations,
        filteredResults,
        selectedLocation,
        onShowLocation,
        dispatch
    } = initialProps;

    let map = leaflet.map(mapId);
    map.setView(initialCoords, 9);

    addEventHandlers(map, makeHandler(dispatch));
    addTileLayer(leaflet, map);

    const _markerGroup = leaflet.featureGroup().addTo(map);
    const _markerCache = {};
    const _optsCache = {};
    const _divIconCache = {};

    const updateMap = makeUpdateMap(leaflet, 
        map, 
        _markerGroup, 
        _markerCache, 
        _optsCache, 
        _divIconCache);
    
    updateMap(locations, 
        filteredResults, 
        selectedLocation, 
        onShowLocation);

    return {
        markerGroup: function () {
            return _markerGroup;
        },
        markerCache: function () {
            return _markerCache;
        },
        props: function (props) {
            if (props) {
                updateMap(props.locations,
                    props.filteredResults,
                    props.selectedLocation,
                    props.onShowLocation);
                if (props.selectedLocation) {
                    setPoint(map, props.selectedLocation);
                }
                return;
            }
        },
        fitTo: function (locations) {
            const coordinates = locations.map(loc => toMarkerCoords(loc.coordinates));
            const bounds = leaflet.latLngBounds(coordinates);
            map.fitBounds(bounds);
        },
        removeMap: function () {
            const mapElement = doc.getElementById(mapId);
            mapElement.remove();
            map = undefined;
        }
    };
};

export default makeController;