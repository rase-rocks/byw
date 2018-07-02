import React from "react";

import { random } from "./quotes";

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
            <section className="quote">
                <div className="container text-center">
                    <div className="row d-flex align-items-center">
                        <h1>{quote.CY}</h1>
                        <h4>{quote.EN}</h4>
                    </div>
                </div>
            </section>
        );
    }
}

export default Quote;
