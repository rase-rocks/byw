import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { privacyRoute } from "../pages/privacy";
import { routes } from "../nav";
import FooterLink from "./footer-link";
import hash from "../core/hash";
import GitHubIcon from "../resusable-components/github-icon";

const footerRoutes = [...routes, privacyRoute];

const links = footerRoutes.map(route => (<FooterLink key={hash(route)} to={route.url} title={route.title} />));

class Footer extends React.Component {
    render() {

        return (
            <footer className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="about col-md-3">
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
                        <div className="site-links col-md-3">
                            <h3>Useful links</h3>
                            <div className="menus d-flex">
                                <ul className="list-unstyled">
                                    {links}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="copyrights text-center">
                    <p>
                        Visit us on
                        &nbsp;
                        <GitHubIcon size="16"/>
                        &nbsp;
                        <a href="https://github.com/rase-rocks/byw"
                            target="_blank"
                            rel="noreferrer noopener">
                            GitHub
                        </a>
                    </p>
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