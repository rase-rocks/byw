import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React from "react";

import { route } from "../../../nav";
import { setSearchTextAction } from "../../../core/redux/actions";
import eventTargetValue from "../../../core/event-target-value";
import HeroSearchBar from "./hero-search-bar";

const evt = eventTargetValue();

class HeroSearchBarController extends React.Component {

    makeOnSubmit() {
        const self = this;
        return function () {
            self.props.history.push(route.map);
        };
    }

    makeOnChange() {
        const self = this;
        return function (e) {
            self.props.dispatch(setSearchTextAction(evt(e)));
        };
    }

    render() {

        const { searchText, suggestion } = this.props;

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
    suggestion: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
    return {
        searchText: state.data.searchText,
        suggestion: state.autocomplete.suggestion
    };
};

export default connect(mapStateToProps)(withRouter(HeroSearchBarController));