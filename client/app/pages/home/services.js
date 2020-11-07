import React from "react";
import PropTypes from "prop-types";

import Col from "../../resusable-components/services-col";
import { strHash } from "../../core/hash";
import k from "../../core/text/supported-keys";

const data = [
    {
        titleKey: k.homeServices1Title,
        descriptionKey: k.homeServices1Desc,
        url: "assets/images/LocateIcon.svg",
        alt: "Locate Places Icon"
    },
    {
        titleKey: k.homeServices2Title,
        descriptionKey: k.homeServices2Desc,
        url: "assets/images/CommentIcon.svg",
        alt: "Speaking Icon"
    },
    {
        titleKey: k.homeServices3Title,
        descriptionKey: k.homeServices3Desc,
        url: "assets/images/SuitcaseIcon.svg",
        alt: "Days out Icon"
    }
];

function services(text) {
    return data
        .map(d => Object.assign({}, d, { title: text[d.titleKey], description: text[d.descriptionKey] }))
        .map(d => (<Col key={strHash(d.titleKey)} {...d} />));
}

export function getText(t) {
    return {
        title: t[k.homeServicesSectionTitle],
        title1: t[k.homeServicesSectionTitle1],
        title2: t[k.homeServicesSectionTitle2]
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