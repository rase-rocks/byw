import React from "react";

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
                <div className="content-separator">
                    <h1>{quote.CY}</h1>
                    <p>{quote.EN}</p>
                </div>
            </div>
        );
    }
}

export default Quote;