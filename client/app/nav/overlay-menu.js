import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { routes } from "./index";

const overlayStyle = function (show) {
    return {
        visibility: (show) ? "visible" : "hidden",
        opacity: (show) ? "1" : "0"
    };
};

const li = function (props) {

    const linkClick = function () {
        props.onCloseRequest();
    };

    return routes.map(function (route) {

        return (
            <li key={route.url} onClick={linkClick}>
                <Link to={route.url}
                    title={route.title}>
                    {props.text[route.pageTitleTextKey]}
                </Link>
            </li>
        );
    });
};

class OverlayMenu extends React.Component {

    handleClose() {
        const self = this;
        return function () {
            self.props.onCloseRequest();
        };
    }

    render() {

        return (
            <div id="overlay-menu" className="overlay-menu" style={overlayStyle(this.props.show)}>

                <div className="navigation-hide">
                    <button id="nav-toggle"
                        onClick={this.handleClose()}
                        className="navbar-toggler active"
                        type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>


                <div className="overlay-menu-inner">
                    <nav className="overlay-menu-nav">
                        <ul id="nav">

                            {li(this.props)}

                        </ul>

                    </nav>
                </div>

                <div className="overlay-navigation-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <p className="copyright font-alt m-b-0">
                                    www.byw.cymru
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

OverlayMenu.propTypes = {
    text: PropTypes.object.isRequired,
    show: PropTypes.bool,
    onCloseRequest: PropTypes.func,
    onClick: PropTypes.func,
};

export default OverlayMenu;