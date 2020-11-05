import React from "react";
import PropTypes from "prop-types";
import { strHash } from "../../core/hash";
import supportedKeys from "../../core/text/supported-keys";

const featuresData = [
    {
        key: supportedKeys.homeSearch,
        icon: "SearchIcon.svg",
        divSize: "col-sm-4"
    },
    {
        key: supportedKeys.homeApi,
        icon: "CodeIcon.svg",
        divSize: "col-sm-4"
    },
    {
        key: supportedKeys.homeMap,
        icon: "MapIcon.svg",
        divSize: "col-sm-4"
    }
];

class Feature extends React.Component {
    render() {

        const { title, icon, divSize } = this.props;

        const src = `assets/images/${icon}`;

        return (
            <div className={divSize}>
                <div className="icon"><img src={src} width="50px" alt={title} /></div>
                <h4 className="h6" style={{ color: "black" }}>{title}</h4>
            </div>
        );
    }
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    divSize: PropTypes.string.isRequired
};

function features(text) {
    return featuresData
        .map(f => Object.assign({}, f, { title: text[f.key]}))
        .map(f => (<Feature key={strHash(f.key)} {...f} />));
}

class FeaturesSection extends React.Component {
    render() {

        const { text } = this.props;

        return (
            <section className="features bg-gray">
                <div className="container text-center">
                    <div className="row">
                        {features(text)}
                    </div>
                </div>
            </section>
        );
    }
}

FeaturesSection.propTypes = {
    text: PropTypes.object.isRequired
};

export default FeaturesSection;