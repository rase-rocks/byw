import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import children from "../core/props-children";

const className = function (pathname, currentUrl) {
    const c = (pathname === currentUrl) ? "active" : "";
    return `nav-item ${c}`;
};

const pathname = function (context) {
    return context.router.route.location.pathname;
};

class NavLink extends React.Component {
    render() {
        return (
            <li className={className(pathname(this.context), this.props.to)}>
                <Link className="nav-link" {...this.props}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: children
};

NavLink.contextTypes = {
    router: PropTypes.object
};

export default NavLink;