import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import isBrowser from "./core/is-browser";

import Nav from "./nav";
import children from "./core/props-children";

import Footer from "./footer";

const wrapperStyle = {
    fontFamily: "Open Sans, sans-serif"
};

const listener = function () {
    if (isBrowser()) {
        window.scrollTo(0, 0);
    }
};

class App extends React.Component {

    constructor(props) {
        super(props);
        props.history.listen(listener);
    }

    render() {

        return (

            <div>
                <Nav />
                <div className="wrapper" style={wrapperStyle}>

                    {this.props.children}

                </div>
                <Footer />
            </div>

        );
    }

}

App.propTypes = {
    children: children,
    history: PropTypes.object.isRequired
};

export default withRouter(App);
