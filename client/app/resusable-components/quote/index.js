import React from "react";
import ContentSeparator from "../content-separator";

import {random} from "./quotes";

class Quote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quote: random()
        };
    }

    render() {

        const quote = this.state.quote;

        return (
            <div className="quote">
                <ContentSeparator>
                    <h1>{quote.CY}</h1>
                    <p>{quote.EN}</p>
                </ContentSeparator>
            </div>
        );
    }
}

export default Quote;