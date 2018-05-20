import React from "react";
import PropTypes from "prop-types";
import isBrowser from "../../../core/is-browser";

import {
    attribution,
    tileLayerString,
    initialCoords,
    MAP_ID
} from "./constants";

import toMarkerCoords from "../../../core/model/geojson-coordinates-to-marker-coordinates";

/*
* TODO: Find a fix for this
*
* Leaflet currently does not play well with server side rendering as it has
* window and document references all over the shop.
*
* As a temporary fix to allow server side rendering, and so that we don't have
* to load Leaflet as a separate script, we are using this conditional require
*/

let L;
if (isBrowser()) {
    // Using node require format as ES6 imports cannot be used inside a condition
    L = require("Leaflet");
}

const popupString = function (location) {
    return `<p>${location.name}</p><button>Click</button>`;
};

const setMarkers = function (map, locations) {
    locations
        .forEach((location) => {
            L.marker(toMarkerCoords(location.coordinates))
                .addTo(map)
                .bindPopup(popupString(location));
        });
};

class FullPageMap extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.filteredResults === this.props.filteredResults) { return; }

        setMarkers(this.state.map, nextProps.filteredResults);

    }

    componentDidMount() {
        if (!isBrowser()) { return; }

        const map = L.map(MAP_ID).setView(initialCoords, 7);
        L.tileLayer(tileLayerString, attribution).addTo(map);
        
        this.setState({ map: map });

        setMarkers(map, this.props.filteredResults);

    }

    render() {
        return (
            <div id={MAP_ID} className="full-page-map" />
        );
    }
}

FullPageMap.propTypes = {
    filteredResults: PropTypes.array
};

export default FullPageMap;