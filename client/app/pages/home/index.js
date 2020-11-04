import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { requestLocationsAction } from "../../core/redux/actions";
import arraySample from "../../core/model/array-sample";
import Home from "./home-page";
import text from "../../core/text/data";

class HomeController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            featuredLocation: undefined
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        const location = arraySample(newProps.locations);
        this.setState({ featuredLocation: location });
    }

    componentDidMount() {
        this.props.dispatch(requestLocationsAction());
    }

    render() {

        const { language } = this.props;

        return (
            <Home text={text[language]}
                featuredLocation={this.state.featuredLocation} />
        );

    }

}

HomeController.propTypes = {
    language: PropTypes.string.isRequired,
    locations: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language,
        locations: state.data.locations
    };
};

export default connect(mapStateToProps)(HomeController);