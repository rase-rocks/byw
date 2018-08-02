import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { clearFormAction, setLocatorCoordinateAction } from "../../../core/redux/actions";
// import { keys } from "../../../core/model/form";
import geoJsonFromMarker from "../../../core/model/geojson-from-marker";
import isBrowser from "../../../core/is-browser";
import makeController from "../../map/map/controller";
import { setViewLocationAction } from "../../../core/redux/actions";

let L;
if (isBrowser()) {
    // Using node require format as ES6 imports cannot be used inside a condition
    L = require("Leaflet");
}

const MAP_ID = "com.byw.submit-locator";

// const dispatchFormData = function (dispatch) {
//     return function (event) {
//         dispatch(clearFormAction());
//         dispatch(setFormDataAction(keys.coordinates, geoJsonFromMarker(event.target)));
//     };
// };

// const icon = function (isSelectionMarker = true) {
//     const opts = (isSelectionMarker) ? selectedLocationMarkerOpts : unusedLocationMarkerOpts;
//     return { icon: L.divIcon(opts) };
// };

// const addMarker = function (map, coordinate, dispatch) {

//     const group = L.featureGroup().addTo(map);
//     group.clearLayers();

//     const opts = Object.assign({ draggable: true, autoPan: true }, icon());
//     const marker = L.marker(coordinate, opts);

//     marker.on("dragend", dispatchFormData(dispatch));

//     marker.addTo(group);

//     return group;
// };

// const addExisting = function (map, locations, group) {
//     const existingGroup = group || L.featureGroup().addTo(map);
//     existingGroup.clearLayers();

//     const opts = Object.assign({draggable: false}, icon(false));

//     locations.forEach((location) => {
//         const coord = location.coordinate || location.coordinates;
//         const marker = L.marker(toMarker(coord), opts);
//         marker.addTo(existingGroup);
//     });

//     return existingGroup;

// };

// const setMapCenterPosition = function (map, coordinate, zoomLevel = ZOOM) {
//     map.setView(toMarker(coordinate), zoomLevel);
// };

const makeReviewHandler = function (props) {
    return function (location) {
        props.dispatch(setViewLocationAction(location));
    };
};

const makeOnLocatorDragend = function (props) {
    return function (event) {
        props.dispatch(clearFormAction());
        props.dispatch(setLocatorCoordinateAction(geoJsonFromMarker(event.target)));
    };
};

const augmentedProps = function (props) {
    const onReview = makeReviewHandler(props);
    const onLocatorDragend = makeOnLocatorDragend(props);
    return Object.assign({}, props, { onReview, onLocatorDragend });
};

class LocatorMap extends React.Component {

    componentDidMount() {

        if (!isBrowser()) { return; }

        const controller = makeController(document, L, MAP_ID, augmentedProps(this.props));
        controller.show(this.props.coordinate);

        this.setState({ controller });

    }

    componentWillUnmount() {
        if (isBrowser()) {
            const { controller } = this.state;
            if (controller) {
                controller.removeMap();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const props = augmentedProps(nextProps);
        const { controller } = this.state;
        
        controller.props(props);
        controller.show(props.coordinate, props.zoom);

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
    zoom: PropTypes.number.isRequired,
    showsLocatorMarker: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        locations: state.data.locations,
        searchText: state.locator.searchText,
        coordinate: state.locator.coordinate,
        zoom: state.locator.zoom,
        showsLocatorMarker: state.locator.showsLocatorMarker
    };
};

export default connect(mapStateToProps)(LocatorMap);