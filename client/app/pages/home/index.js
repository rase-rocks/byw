import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { requestLocationsAction } from "../../core/redux/actions";
import arraySample from "../../core/model/array-sample";
import Home from "./home-page";

class HomeController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            featuredLocation: undefined
        };
    }

    componentWillReceiveProps(newProps) {
        const location = arraySample(newProps.locations);
        this.setState({ featuredLocation: location });
    }

    componentDidMount() {
        this.props.dispatch(requestLocationsAction());
    }

    render() {

        return (
            <Home featuredLocation={this.state.featuredLocation} />
        );

    }

}

HomeController.propTypes = {
    locations: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        locations: state.data.locations
    };
};

export default connect(mapStateToProps)(HomeController);