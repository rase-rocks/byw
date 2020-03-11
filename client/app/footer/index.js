import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { Link } from "react-router-dom";

import { privacyRoute } from "../pages/privacy";
import routes from "../nav/routes";
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
                                Breathe your Welsh
                            </h4>
                            
                            <Link to="/no-page-here">Test the 404 page</Link>

                        </div>
                        <div className="col-md-6">
                            <h4>
                                Contributing
                            </h4>
                            <p>
                                Everyone can help learners find places to go and use their Welsh.
                                Your submissions also help us to monitor how much the langauge is used,
                                not just in Wales, but across the world.
                            </p>
                            <p>
                                Submitting a review is quick and no account or login is required. If you
                                are aware of a place that Welsh can be heard and used, but is not already
                                in our index, submitting it to the index will let others know.
                            </p>
                        </div>
                        <div className="site-links col-md-3">

                            <h4>Useful links</h4>
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