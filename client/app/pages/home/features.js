import React from "react";
import PropTypes from "prop-types";
import {strHash} from "../../core/hash";

const features = [
    {
        title: "Search",
        icon: "SearchIcon.svg",
        divSize: "col-sm-4"
    },
    {
        title: "Api",
        icon: "CodeIcon.svg",
        divSize: "col-sm-4"
    },
    {
        title: "Map",
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
                <div className="icon"><img src={src} width="50px" alt={title}/></div>
                <h4 className="h6" style={{color: "darkgrey"}}>{title}</h4>
            </div>
        );
    }
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    divSize: PropTypes.string.isRequired
};

const staticFeatures = features.map(feature => {
    return (<Feature key={strHash(feature.title)} {...feature}/>);
});

class FeaturesSection extends React.Component {
    render() {
        return (
            <section className="features bg-gray">
                <div className="container text-center">
                    <div className="row">
                        {staticFeatures}
                    </div>
                </div>
            </section>
        );
    }
}

export default FeaturesSection;