import React from "react";
import PropTypes from "prop-types";

import { random } from "../../resusable-components/quote/quotes";
import colors from "../../core/colors";
import FetchableSectionBackground from "../../resusable-components/FetchableSectionBackground";
import k from "../../core/text/supported-keys";

export function getText(t) {
    return {
        title: t[k.homeThoughtOfTheDay]
    };
}

class PromotionDivider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quote: random()
        };
    }

    render() {

        const { quote } = this.state;
        const { text } = this.props;

        const { title } = getText(text);

        return (
            <FetchableSectionBackground
                backgroundColor={colors.seaBlue}
                url="assets/images/ali-al-mufti-365944-unsplash.jpg"
                classes="divider">
                <div className="container">
                    <h2 className="has-lines">
                        <small className="text-primary">
                            {title}
                        </small>
                        {quote.CY}
                    </h2>
                    <p className="lead">
                        {quote.EN}
                    </p>
                </div>
            </FetchableSectionBackground>
        );
    }
}

PromotionDivider.propTypes = {
    text: PropTypes.object.isRequired
};

export default PromotionDivider;