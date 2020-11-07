import React from "react";
import PropTypes from "prop-types";

import k from "../../../../core/text/supported-keys";
import { descriptions } from "../../../../core/model/form/category";
import { strHash } from "../../../../core/hash";
import LegendItem from "./legend-item";

const makeAddTitle = function(text) {
    return function (description) {
        return Object.assign({}, description, { title: text[description.titleKey]});
    };
};

const toItem = function (description) {
    return (<LegendItem key={strHash(description.title)} category={description} />);
};

export function getText(t) {
    return {
        title:          t[k.mapLegendTitle],
        subheading:     t[k.mapLegendSubheading]
    };
}

class Legend extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {

        const { text } = this.props;

        const {
            title,
            subheading
        } = getText(text);

        const cols = descriptions
            .map(makeAddTitle(text))
            .map(toItem);

        return (
            <div className="container legend-container">
                <div className="row">
                    <div className="col-md-12">
                        <p>
                            {title}
                        </p>
                        <p>
                            <small>
                                {subheading} 
                            </small>
                        </p>
                    </div>
                </div>
                <div className="row">
                    {cols}
                </div>
            </div>
        );
    }
}

Legend.propTypes = {
    text: PropTypes.object.isRequired
};

export default Legend;