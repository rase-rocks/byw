import {
    attribution,
    tileLayerString
} from "../constants";
import events from "./leaflet-events";

export const addTileLayer = function (leaflet, map) {
    leaflet.tileLayer(tileLayerString, attribution).addTo(map);
};

export const addEventHandlers = function (map, handler) {
    [events.zoom, events.move].forEach(function (eventName) {
        map.on(eventName, handler);
    });
};