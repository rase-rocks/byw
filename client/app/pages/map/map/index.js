import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { MAP_ID } from "./constants";
import isBrowser from "../../../core/is-browser";
import makeController from "./controller";

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

class MapController extends React.Component {

    componentDidMount() {

        if (!isBrowser()) { return; }

        const controller = makeController(document, L, MAP_ID, this.props);
        
        const { selectedLocation, filteredResults } = this.props;
        if (selectedLocation) {
            controller.show(selectedLocation.coordinates);
        } else if (filteredResults) {
            controller.fitTo(filteredResults);
        }

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
        const controller = this.state.controller;
        
        controller.props(nextProps);
        if (nextProps.filteredResults 
            && nextProps.filteredResults.length > 0) controller.fitTo(nextProps.filteredResults);
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
    onReview: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(MapController);