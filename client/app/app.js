import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React from "react";

import children from "./core/props-children";
import Footer from "./footer";
import isBrowser from "./core/is-browser";
import Nav  from "./nav";
import { canonicalPath, titleTag, keywordsTag, descriptionTag } from "./nav/routes";

const setCanonical = function (url) {
    document
        .querySelector("link[rel='canonical']")
        .setAttribute("href", "https://www.byw.cymru" + canonicalPath(url));
};

const setTitle = function (url) {
    document.title = titleTag(url);
};

const setKeywords = function (url) {
    document
        .querySelector("meta[name='keywords']")
        .setAttribute("content", keywordsTag(url));
};

const setDesc = function (url) {
    document
        .querySelector("meta[name='description']")
        .setAttribute("content", descriptionTag(url));
};

const setHeadAttributes = function (url) {
    if (!url || !isBrowser()) { return; }
    setCanonical(url);
    setTitle(url);
    setKeywords(url);
    setDesc(url);
};

const listener = function () {
    if (isBrowser()) {
        window.scrollTo(0, 0);
    }
};

class App extends React.Component {

    constructor(props) {
        super(props);
        props.history.listen(listener);
    }

    render() {

        const { location } = this.props;

        setHeadAttributes(location.pathname);

        return (
            <div>
                <Nav />
                <div>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }

}

App.propTypes = {
    children: children,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default withRouter(App);
