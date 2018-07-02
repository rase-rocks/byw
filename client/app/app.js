import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React from "react";

import children from "./core/props-children";
import Footer from "./footer";
import isBrowser from "./core/is-browser";
import Nav from "./nav";

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
                <div>
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
