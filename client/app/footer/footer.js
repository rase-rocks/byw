import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import FooterLink from "./footer-link";
import hash from "../core/hash";
import GitHubIcon from "../resusable-components/github-icon";
import k from "../core/text/supported-keys";

function links(routes) {
    return routes.map(route => (<FooterLink key={hash(route)} 
        to={route.url} 
        title={route.translatedTitle} />));
}

export function getText(t) {
    return {
        test404:        t[k.footerTest404],
        contributing:   t[k.footerContributing],
        p1:             t[k.footerP1],
        p2:             t[k.footerP2],
        usefulLinks:    t[k.footerUsefulLinks],
        visitOn:        t[k.footerVisitOn]
    };
}

class Footer extends React.Component {
    render() {

        const { text, routes } = this.props;

        const  {
            test404,
            contributing,
            p1,
            p2,
            usefulLinks,
            visitOn
        } = getText(text);

        return (
            <footer className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="about col-md-3">

                            <h4>
                                BYW
                            </h4>
                            
                            <Link to="/no-page-here">{test404}</Link>

                        </div>
                        <div className="col-md-6">
                            <h4>
                                {contributing}
                            </h4>
                            <p>
                                {p1}
                            </p>
                            <p>
                                {p2}
                            </p>
                        </div>
                        <div className="site-links col-md-3">

                            <h4>{usefulLinks}</h4>
                            <div className="menus d-flex">
                                <ul className="list-unstyled">
                                    {links(routes)}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="copyrights text-center">
                    <p>
                        {visitOn}
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
    text: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default Footer;