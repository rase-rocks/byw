import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { clearFormAction, setLocatorCoordinateAction } from "../../../core/redux/actions";
import { setViewLocationAction } from "../../../core/redux/actions";
import { SHOW_ZOOM, NORMAL_ZOOM } from "../../map/map/constants";
import geoJsonFromMarker from "../../../core/model/geojson-from-marker";
import isBrowser from "../../../core/is-browser";
import makeController from "../../map/map/controller";
import addTextContent from "../../map/map/add-text-content";

let L;
if (isBrowser()) {
    // Using node require format as ES6 imports cannot be used inside a condition
    L = require("Leaflet");
}

const MAP_ID = "com.byw.submit-locator";

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
    return Object.assign({}, addTextContent(props), { onReview, onLocatorDragend });
};

class LocatorMap extends React.Component {

    componentDidMount() {

        if (!isBrowser()) { return; }

        const controller = makeController(document, L, MAP_ID, augmentedProps(this.props));

        const coordinate = (this.props.selectedLocation)
            ? this.props.selectedLocation.coordinates
            : this.props.coordinate;

        const zoom = (this.props.selectedLocation) ? SHOW_ZOOM : NORMAL_ZOOM;

        controller.show(coordinate, zoom);

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

    UNSAFE_componentWillReceiveProps(nextProps) {
        const props = augmentedProps(nextProps);
        const { controller } = this.state;

        controller.props(props);

        if (props.selectedLocation) controller.show(props.coordinate, SHOW_ZOOM);

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
    text: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
    coordinate: PropTypes.array.isRequired,
    selectedLocation: PropTypes.object,
    showsLocatorMarker: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language,
        locations: state.data.locations,
        searchText: state.locator.searchText,
        coordinate: state.locator.coordinate,
        selectedLocation: state.data.selectedLocation,
        showsLocatorMarker: state.locator.showsLocatorMarker
    };
};

export default connect(mapStateToProps)(LocatorMap);