import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { requestLocationsAction, filterLocationsAction } from "../../core/redux/actions";

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
            const searchFor = value(e);
            self.setState({searchText : searchFor});
            self.props.dispatch(filterLocationsAction(searchFor));
        };
    }

    render() {
        return (
            <MapPage filteredResults={this.props.filteredResults}
                searchText={this.state.searchText}
                searchValueDidChange={this.onTextChange()} />
        );
    }
}

MapPageController.propTypes = {
    filteredResults: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        filteredResults: state.data.filteredResults
    };
};

export default connect(mapStateToProps)(MapPageController);