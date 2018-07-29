import {
    attribution,
    tileLayerString
} from "../constants";

export const addTileLayer = function (leaflet, map) {
    leaflet.tileLayer(tileLayerString, attribution).addTo(map);
};

export const addEventHandlers = function (map, handler) {
    ["zoom", "move"].forEach(function (eventName) {
        map.on(eventName, handler);
    });
};