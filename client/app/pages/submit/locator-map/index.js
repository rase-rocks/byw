import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { clearFormAction, setFormDataAction } from "../../../core/redux/actions";
import { keys } from "../../../core/model/form";
import isBrowser from "../../../core/is-browser";

import {
    unusedLocationMarkerOpts,
    selectedLocationMarkerOpts
} from "../../../core/model/marker-opts";

import {
    attribution,
    tileLayerString
} from "../../map/map/constants";
import toMarker from "../../../core/model/geojson-coordinates-to-marker-coordinates";
import arrayCompare from "../../../core/model/array-compare";

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
const ZOOM = 7;

export const geoJsonFromMarker = function (marker) {
    const latLng = marker.getLatLng();
    return [
        latLng.lng,
        latLng.lat
    ];
};

const dispatchFormData = function (dispatch) {
    return function (event) {
        dispatch(clearFormAction());
        dispatch(setFormDataAction(keys.coordinates, geoJsonFromMarker(event.target)));
    };
};

const icon = function (isSelectionMarker = true) {
    const opts = (isSelectionMarker) ? selectedLocationMarkerOpts : unusedLocationMarkerOpts;
    return { icon: L.divIcon(opts) };
};

const addMarker = function (map, coordinate, dispatch) {

    const group = L.featureGroup().addTo(map);
    group.clearLayers();

    const opts = Object.assign({ draggable: true, autoPan: true }, icon());
    const marker = L.marker(coordinate, opts);

    marker.on("dragend", dispatchFormData(dispatch));

    marker.addTo(group);

    return group;
};

const addExisting = function (map, locations, group) {
    const existingGroup = group || L.featureGroup().addTo(map);
    existingGroup.clearLayers();

    const opts = Object.assign({draggable: false}, icon(false));

    locations.forEach((location) => {
        const coord = location.coordinate || location.coordinates;
        const marker = L.marker(toMarker(coord), opts);
        marker.addTo(existingGroup);
    });

    return existingGroup;

};

const initMap = function (coordinate, locations, dispatch) {
    const map = L.map(MAP_ID);
    L.tileLayer(tileLayerString, attribution).addTo(map);

    const markerCoordinate = toMarker(coordinate);

    map.setView(markerCoordinate, ZOOM);

    const group = addMarker(map, markerCoordinate, dispatch);
    const existingGroup = addExisting(map, locations);

    return {
        map,
        group,
        existingGroup
    };
};

const setMapCenterPosition = function (map, coordinate, zoomLevel = ZOOM) {
    map.setView(toMarker(coordinate), zoomLevel);
};

class LocatorMap extends React.Component {

    componentDidMount() {

        if (!isBrowser()) { return; }
        const { locations, coordinate, dispatch } = this.props;

        this.setState(initMap(coordinate, locations, dispatch));

    }

    componentWillReceiveProps(nextProps) {
        if (!arrayCompare(nextProps.coordinate, this.props.coordinate)) {
            setMapCenterPosition(this.state.map, nextProps.coordinate);
        }
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
    locations: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
    coordinate: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        locations: state.data.locations,
        searchText: state.locator.searchText,
        coordinate: state.locator.coordinate
    };
};

export default connect(mapStateToProps)(LocatorMap);