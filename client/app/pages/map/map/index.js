import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { filterLocationsByPolygon } from "../../../core/redux/actions";
import { locationMarkerOpts, unusedLocationMarkerOpts } from "../../../resusable-components/marker-opts";
import isBrowser from "../../../core/is-browser";
import popup from "./popup";

import {
    attribution,
    tileLayerString,
    initialCoords,
    MAP_ID
} from "./constants";

import toMarkerCoords from "../../../core/model/geojson-coordinates-to-marker-coordinates";
import toPolygon from "../../../core/model/lat-lng-bounds-to-polygon";

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

const locationMarker = function (location, filteredLocations) {
    const opts = (isUsed(location, filteredLocations)) 
        ? locationMarkerOpts 
        : unusedLocationMarkerOpts;

    return { icon: L.icon(opts) };
};

const isUsed = function (location, locationDictionary) {
    return locationDictionary[location.coordinateHash] !== undefined;
};

const filteredLocationsObj = function (filteredResults) {
    return filteredResults.reduce((acc, loc) => {
        acc[loc.coordinateHash] = loc;
        return acc;
    }, {});
};

const setMarkers = function (map,
    locations = [],
    filteredLocations = [],
    markerGroup,
    onShowLocation) {

    const group = markerGroup || L.featureGroup().addTo(map);

    group.clearLayers();

    const filtered = filteredLocationsObj(filteredLocations);
    
    locations
        .forEach((loc) => {
            L.marker(toMarkerCoords(loc.coordinates), locationMarker(loc, filtered))
                .addTo(group)
                .bindPopup(popup(loc, onShowLocation));
        });

    return group;
};

const setPoint = function (map, location) {
    map.setView(toMarkerCoords(location.coordinates), 18);
};

const addEventHandlers = function (map, handler) {
    ["zoom", "move"].forEach(function (eventName) {
        map.on(eventName, handler);
    });
};

const makeHandler = function (dispatch) {
    return function (event) {
        const polygon = toPolygon(event.target.getBounds());
        dispatch(filterLocationsByPolygon(polygon));
    };
};

class MapController extends React.Component {

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedLocation) {
            setPoint(this.state.map, nextProps.selectedLocation, this.state.markerGroup);
        } else {

            //if (nextProps.filteredResults !== this.props.filteredResults) {
            setMarkers(this.state.map,
                nextProps.locations,
                nextProps.filteredResults,
                this.state.markerGroup,
                nextProps.onShowLocation);
            //}

        }


    }

    componentDidMount() {

        if (!isBrowser()) { return; }

        const map = L.map(MAP_ID);

        const { dispatch, locations, filteredResults } = this.props;

        addEventHandlers(map, makeHandler(dispatch));

        L.tileLayer(tileLayerString, attribution).addTo(map);

        const markerGroup = setMarkers(map, locations, filteredResults);

        this.setState({ map: map, markerGroup: markerGroup });

        if (filteredResults.length > 0) {
            map.fitBounds(markerGroup.getBounds());
        } else {
            map.setView(initialCoords, 9);
        }

    }

    componentWillUnmount() {
        if (isBrowser()) {
            const map = document.getElementById(MAP_ID);
            map.remove();
        }
    }

    render() {
        return (
            <div id={MAP_ID} className="full-page-map" />
        );
    }
}

MapController.propTypes = {
    filteredResults: PropTypes.array,
    locations: PropTypes.array,
    selectedLocation: PropTypes.object,
    onShowLocation: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(MapController);