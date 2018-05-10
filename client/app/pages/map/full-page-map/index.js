import React from "react";
import isBrowser from "../../../core/is-browser";

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

const MAP_ID = "full-page-map";

class FullPageMap extends React.Component {

    componentDidMount() {
        if (!isBrowser()) { return; }
        var map = L.map(MAP_ID).setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
            .openPopup();
    }



    render() {
        return (
            <div id={MAP_ID} className="full-page-map"/>
        );
    }
}

export default FullPageMap;