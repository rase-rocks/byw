import React from "react";
import PropTypes from "prop-types";
import {strHash} from "../../core/hash";

const features = [
    {
        title: "Search",
        icon: "fa fa-search",
        divSize: "col-sm-4"
    },
    {
        title: "Api",
        icon: "fa fa-code",
        divSize: "col-sm-4"
    },
    {
        title: "Map",
        icon: "fa fa-map",
        divSize: "col-sm-4"
    }
];

class Feature extends React.Component {
    render() {

        const { title, icon, divSize } = this.props;

        return (
            <div className={divSize}>
                <div className="icon"><i className={icon}></i></div>
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