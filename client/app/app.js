import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router";
import { connect } from "react-redux";

import children from "./core/props-children";
import Footer from "./footer";
import isBrowser from "./core/is-browser";
import Nav from "./nav";
import { canonicalPath, titleTag, keywordsTag, descriptionTag } from "./nav/routes";

const setCanonical = function (url) {
    document
        .querySelector("link[rel='canonical']")
        .setAttribute("href", "https://www.byw.cymru" + canonicalPath(url));
};

const setTitle = function (url, language) {
    document.title = titleTag(url, language);
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

const setHeadAttributes = function (url, language) {
    if (!url || !isBrowser()) { return; }
    setCanonical(url);
    setTitle(url, language);
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

        const { language, location } = this.props;

        setHeadAttributes(location.pathname, language);

        return (
            <div>
                <Nav language={language}/>
                <div>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

App.propTypes = {
    language: PropTypes.string.isRequired,
    children: children,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(App));
