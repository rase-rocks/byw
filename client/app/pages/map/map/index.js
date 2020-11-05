import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { MAP_ID } from "./constants";
import isBrowser from "../../../core/is-browser";
import makeController from "./controller";
import addTextContent from "./add-text-content";

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

        const props = addTextContent(this.props);

        const controller = makeController(document, L, MAP_ID, props);
        
        const { selectedLocation, filteredResults } = props;
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        const controller = this.state.controller;
        const props = addTextContent(nextProps);
        
        controller.props(props);
        if (props.filteredResults 
            && props.filteredResults.length > 0) controller.fitTo(props.filteredResults);
    }

    render() {
        return (
            <div id={MAP_ID} className="full-page-map" />
        );
    }
}

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

MapController.propTypes = {
    language: PropTypes.string.isRequired,
    filteredResults: PropTypes.array,
    locations: PropTypes.array,
    selectedLocation: PropTypes.object,
    onShowLocation: PropTypes.func.isRequired,
    onReview: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(MapController);