import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { requestLocationsAction } from "../../core/redux/actions";

import eventTargetValue from "../../core/event-target-value";
const value = eventTargetValue();

import bindMethods from "../../core/bind-methods";

import MapPage from "./map-page";

class MapPageController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: ""
        };

        bindMethods(this, ["onTextChange"]);
    }

    componentDidMount() {
        this.props.dispatch(requestLocationsAction());
    }

    onTextChange() {
        const self = this;
        return function (e) {
            self.setState({searchText : value(e)});
        };
    }

    render() {
        return (
            <MapPage searchResults={this.props.searchResults}
                searchText={this.state.searchText}
                searchValueDidChange={this.onTextChange()} />
        );
    }
}

MapPageController.propTypes = {
    searchResults: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        searchResults: state.data.searchResults
    };
};

export default connect(mapStateToProps)(MapPageController);