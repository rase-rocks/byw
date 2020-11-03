import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router";

import { strHash } from "../core/hash";
import NavLink from "./nav-link";
import OverlayMenu from "./overlay-menu";
import text from "../core/text/data";

import routes, { route } from "./routes";

const li = function (translatedText) {
    return function link (route) {
        return (
            <NavLink key={strHash(route.url)}
                to={route.url}>
                {translatedText[route.pageTitleTextKey]}
            </NavLink>);
    };
};

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

        const { language } = this.props;

        const translatedText = text[language];

        const links = routes.map(li(translatedText));

        const buttonClass = (this.state.showMenu)
            ? buttonBaseClass + " active"
            : buttonBaseClass;

        return (
            <header>

                <OverlayMenu text={translatedText}
                    show={this.state.showMenu}
                    onCloseRequest={this.makeToggler()} />

                <nav id="mainNav" className="nav navbar navbar-expand-lg">
                    <div className="container">

                        <ul>
                            <NavLink className="navbar-brand" to="/">BYW</NavLink>
                        </ul>

                        <button id="nav-toggle"
                            aria-label="Navigation Menu"
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
    language: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export { routes, route };
export default withRouter(Nav);
