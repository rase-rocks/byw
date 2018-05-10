import React from "react";
import PropTypes from "prop-types";
import NavLink from "./nav-link";

import { strHash } from "../core/hash";

const li = function (route) {
    return (<NavLink key={strHash(route.url)} to={route.url}>{route.title}</NavLink>);
};

const routes = [
    { url: "/", title: "Home" },
    { url: "/map", title: "Map" },
    { url: "/about", title: "About" }
].map(li);

class Nav extends React.Component {
    render() {
        return (
            <nav id="mainNav" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">BYW</a>
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="nav navbar-nav ml-auto">
                            {routes}
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
}

Nav.contextTypes = {
    router: PropTypes.object
};

export default Nav;