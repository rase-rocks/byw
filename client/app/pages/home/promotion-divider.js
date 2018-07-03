import React from "react";

import { random } from "../../resusable-components/quote/quotes";
import colors from "../../core/colors";
import FetchableSectionBackground from "../../resusable-components/FetchableSectionBackground";

class PromotionDivider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quote: random()
        };
    }

    render() {

        const { quote } = this.state;

        return (
            <FetchableSectionBackground
                backgroundColor={colors.seaBlue}
                url="assets/images/ali-al-mufti-365944-unsplash.jpg"
                classes="divider">
                <div className="container">
                    <h2 className="has-lines">
                        <small className="text-primary">
                            Thought of the day
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

export default PromotionDivider;