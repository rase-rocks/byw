//import PropTypes from "prop-types";
import React from "react";
import isBrowser from "../../../core/is-browser";

import {
    attribution,
    tileLayerString,
    initialCoords
} from "../../map/map/constants";

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

const MAP_ID = "com.byw.submit-locator";

class LocatorMap extends React.Component {

    componentDidMount() {

        if (!isBrowser()) { return; }

        const map = L.map(MAP_ID);
        L.tileLayer(tileLayerString, attribution).addTo(map);
        map.setView(initialCoords, 9);

        this.setState({ map: map });

    }

    render() {
        return (
            <div className="locator-map-container">
                <div id={MAP_ID} className="submit-locator-map" />
            </div>
        );
    }
}

LocatorMap.propTypes = {

};

export default LocatorMap;