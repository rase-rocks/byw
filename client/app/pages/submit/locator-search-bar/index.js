import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import LocatorSearchBar from "./locator-search-bar";

class LocatorSearchBarController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        };
    }

    makeOnChange() {
        const self = this;
        return function (newValue) {
            self.setState({ searchText: newValue });
        };
    }

    render() {

        return (
            <LocatorSearchBar searchText={this.state.searchText}
                onChange={this.makeOnChange()} />
        );

    }
}

LocatorSearchBarController.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(LocatorSearchBarController);