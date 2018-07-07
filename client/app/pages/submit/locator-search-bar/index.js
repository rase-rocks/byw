import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { setLocatorSearchTextAction } from "../../../core/redux/actions";
import LocatorSearchBar from "./locator-search-bar";

class LocatorSearchBarController extends React.Component {

    makeOnChange() {
        const self = this;
        return function (newValue) {
            self.props.dispatch(setLocatorSearchTextAction(newValue));
        };
    }

    render() {

        return (
            <LocatorSearchBar searchText={this.props.searchText}
                onChange={this.makeOnChange()} />
        );

    }
}

LocatorSearchBarController.propTypes = {
    searchText: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        searchText: state.locator.searchText
    };
};

export default connect(mapStateToProps)(LocatorSearchBarController);