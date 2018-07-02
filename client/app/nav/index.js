import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React from "react";

import { strHash } from "../core/hash";
import NavLink from "./nav-link";
import OverlayMenu from "./overlay-menu";

const li = function (route) {
    return (<NavLink key={strHash(route.url)} to={route.url}>{route.title}</NavLink>);
};

export const routes = [
    { url: "/", title: "Home" },
    { url: "/map", title: "Map" },
    { url: "/about", title: "About" },
    { url: "/submit", title: "Submit" }
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

    componentWillReceiveProps(newProps) {
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
                        <a className="navbar-brand" href="#">BYW</a>

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

/*
      <nav id="mainNav" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">BYW</a>
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={this.makeToggler()}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={collapseClass} id="navbarResponsive">
                        <ul className="nav navbar-nav ml-auto">
                            {links}
                        </ul>
                    </div>
                </div>
            </nav>*/