import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { privacyRoute } from "../pages/privacy";
import { routes } from "../nav";
import FooterLink from "./footer-link";
import hash from "../core/hash";

const footerRoutes = [...routes, privacyRoute];

const links = footerRoutes.map(route => (<FooterLink key={hash(route)} to={route.url} title={route.title}/>));

class Footer extends React.Component {
    render() {

        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h4>
                                Breath your Welsh
                            </h4>
                        </div>
                        <div className="col-md-3">
                            <p>
                                Some useful footer type information in here
                            </p>
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-3">
                            <h4>
                                Some links
                            </h4>
                            <ul className="footer-nav">
                                {links}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer >
        );
    }
}

Footer.propTypes = {
    language: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

export default connect(mapStateToProps)(Footer);