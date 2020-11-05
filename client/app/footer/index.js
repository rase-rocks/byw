import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import routes, { privacyRoute } from "../nav/routes";
import text from "../core/text/data";

import Footer from "./footer";

const footerRoutes = [...routes, privacyRoute];

function makeTranslatedRoutes(text) {
    return footerRoutes
        .map(r => Object.assign({}, 
            r, 
            { translatedTitle: text[r.pageTitleTextKey] }));
}

class FooterController extends React.Component {

    render() {

        const { language } = this.props;
        const content = text[language];
        const routes = makeTranslatedRoutes(content);

        return (
            <Footer text={content}
                routes={routes} />
        );

    }

}

FooterController.propTypes = {
    language: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

export default connect(mapStateToProps)(FooterController);