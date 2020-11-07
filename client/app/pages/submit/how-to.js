import React from "react";
import PropTypes from "prop-types";
import { strHash } from "../../core/hash";

import SubmitHeading from "./submit-heading";
import supportedKeys from "../../core/text/supported-keys";

const k = supportedKeys;

class Space extends React.Component {
    render() {
        return (<div style={{ height: "20px" }}></div>);
    }
}

function li(value) {
    return (<li key={strHash(value)}>{value}.</li>);
}

export function getText(t) {
    return {
        title:      t[k.howToTitle],    find:   t[k.howToFind],
        ol1a:       t[k.howToOL1a],     ol1b:   t[k.howToOL1b],
        ol1c:       t[k.howToOL1c],     submit: t[k.howToSubmit],
        ol2a:       t[k.howToOL2a],     ol2b:   t[k.howToOL2b],
        ol2c:       t[k.howToOL2c],     inaccurate: t[k.howToInaccurate],
        p1:         t[k.howToP1],       p2: t[k.howToP2]
    }
}

class HowTo extends React.Component {

    render() {

        const { text } = this.props;

        const {
            title,  find,
            ol1a,   ol1b,
            ol1c,   submit,
            ol2a,   ol2b,
            ol2c,   inaccurate,
            p1,     p2
        } = getText(text);

        const ol1 = [ol1a, ol1b, ol1c].map(li);
        const ol2 = [ol2a, ol2b, ol2c].map(li);

        return (
            <div>
                <hr />
                <Space />

                <SubmitHeading title={title} />

                <div className="row">
                    <div className="col-md-6"><p>{find}:</p><ol>{ol1}</ol></div>
                    <div className="col-md-6"><p>{submit}:</p><ol>{ol2}</ol></div>
                </div>

                <SubmitHeading title={inaccurate} />

                <div className="row">
                    <div className="col-md-6"><p>{p1}.</p></div>
                    <div className="col-md-6"><p>{p2}.</p></div>
                </div>
            </div>
        );
    }
}

HowTo.propTypes = {
    text: PropTypes.object.isRequired
}

export default HowTo;