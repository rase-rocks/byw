import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

class FooterLink extends React.Component {
    render() {

        const { to, title } = this.props;

        return (
            <li>
                <Link to={to}><small>{title.toUpperCase()}</small></Link>
            </li>
        );
    }
}

FooterLink.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default FooterLink;