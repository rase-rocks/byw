import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { requestLocationsAction } from "../../core/redux/actions";

import MapPage from "./map-page";

class MapPageController extends React.Component {

    componentDidMount() {
        this.props.dispatch(requestLocationsAction());
    }

    render() {
        return (
            <MapPage locations={this.props.locations}/>
        );
    }
}

MapPageController.propTypes = {
    locations: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        locations: state.data.locations
    };
};

export default connect(mapStateToProps)(MapPageController);