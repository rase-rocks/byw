import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React from "react";

import { route } from "../../../nav";
import { setSearchTextAction } from "../../../core/redux/actions";
import eventTargetValue from "../../../core/event-target-value";
import HeroSearchBar from "./hero-search-bar";

const evt = eventTargetValue();

const defaultSuggestion = "";

const selectResult = function (results) {
    if (!results || results.length === 0) { return defaultSuggestion;}
    return (results.length > 1)
        ? `${results[0].name} (and ${results.length} more)`
        : results[0].name;
};

class HeroSearchBarController extends React.Component {

    makeOnSubmit() {
        const self = this;
        return function () {
            self.props.history.push(route.map);
        };
    }

    makeOnChange() {
        const self = this;
        return function (value) {
            self.props.dispatch(setSearchTextAction(evt(value)));
        };
    }

    render() {

        const { searchText, filteredResults } = this.props;
        const suggestion = selectResult(filteredResults);

        return (
            <HeroSearchBar searchText={searchText}
                suggestion={suggestion}
                onSubmit={this.makeOnSubmit()}
                onChange={this.makeOnChange()} />
        );
    }
}

HeroSearchBarController.propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    filteredResults: PropTypes.array.isRequired
};

const mapStateToProps = function (state) {
    return {
        searchText: state.data.searchText,
        filteredResults: state.data.filteredResults
    };
};

export default connect(mapStateToProps)(withRouter(HeroSearchBarController));