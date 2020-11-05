import React from "react";
import PropTypes from "prop-types";

import Col from "../../resusable-components/services-col";
import { strHash } from "../../core/hash";
import supportedKeys from "../../core/text/supported-keys";

const data = [
    {
        titleKey: supportedKeys.homeServices1Title,
        descriptionKey: supportedKeys.homeServices1Desc,
        url: "assets/images/LocateIcon.svg",
        alt: "Locate Places Icon"
    },
    {
        titleKey: supportedKeys.homeServices2Title,
        descriptionKey: supportedKeys.homeServices2Desc,
        url: "assets/images/CommentIcon.svg",
        alt: "Speaking Icon"
    },
    {
        titleKey: supportedKeys.homeServices3Title,
        descriptionKey: supportedKeys.homeServices3Desc,
        url: "assets/images/SuitcaseIcon.svg",
        alt: "Days out Icon"
    }
];

function services(text) {
    return data
        .map(d => Object.assign({}, d, { title: text[d.titleKey], description: text[d.descriptionKey] }))
        .map(d => (<Col key={strHash(d.titleKey)} {...d} />));
}

function getText(text) {
    return {
        title: text[supportedKeys.homeServicesSectionTitle],
        title1: text[supportedKeys.homeServicesSectionTitle1],
        title2: text[supportedKeys.homeServicesSectionTitle2]
    };
}

class ServicesSection extends React.Component {
    render() {

        const { text } = this.props;

        const {
            title,
            title1,
            title2
        } = getText(text);

        return (
            <section className="services">
                <div className="container text-center">
                    <header>
                        <h2><small>{title}</small>
                            {title1} <span className="text-primary">BYW</span> {title2}</h2>
                        <p className="lead col-md-10 mx-auto">

                        </p>
                    </header>
                    <div className="row">

                        {services(text)}

                    </div>
                </div>
            </section>
        );
    }
}

ServicesSection.propTypes = {
    text: PropTypes.object.isRequired
};

export default ServicesSection;