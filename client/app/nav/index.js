import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React from "react";

import { strHash } from "../core/hash";
import NavLink from "./nav-link";
import OverlayMenu from "./overlay-menu";

const li = function (route) {
    return (<NavLink key={strHash(route.url)} to={route.url}>{route.title}</NavLink>);
};

export const route = {
    home: "/",
    map: "/map",
    vocabulary: "/vocabulary",
    about: "/about",
    submit: "/submit"
};

export const routes = [
    { url: route.home, title: "Home" },
    { url: route.map, title: "Map" },
    { url: route.vocabulary, title: "Vocab" },
    { url: route.about, title: "About" },
    { url: route.submit, title: "Submit" }
];

const links = routes.map(li);

const buttonBaseClass = "navbar-toggler";

const pathnameIsEqual = function (newProps, oldProps) {
    return newProps.location.pathname === oldProps.location.pathname;
};

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showMenu: false
        };
    }

    makeToggler() {
        const self = this;
        return function () {
            self.setState({ showMenu: !self.state.showMenu });
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!pathnameIsEqual(newProps, this.props)) {
            this.setState({ showMenu: false });
        }
    }

    render() {

        const buttonClass = (this.state.showMenu)
            ? buttonBaseClass + " active"
            : buttonBaseClass;

        return (
            <header>

                <OverlayMenu show={this.state.showMenu}
                    onCloseRequest={this.makeToggler()} />

                <nav id="mainNav" className="nav navbar navbar-expand-lg">
                    <div className="container">
                        <NavLink className="navbar-brand" to="/">BYW</NavLink>

                        <button id="nav-toggle"
                            onClick={this.makeToggler()}
                            className={buttonClass}
                            type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        <div className="navbar-collapse collapse" id="navbarcollapse">
                            <ul className="navbar-nav ml-auto">
                                {links}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

Nav.contextTypes = {
    router: PropTypes.object
};

Nav.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(Nav);
