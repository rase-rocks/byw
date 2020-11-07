import React from "react";
import PropTypes from "prop-types";

import k from "../../core/text/supported-keys";

export function getText(t) {
    return {
        type: t[k.privacyType],
        link: t[k.privacyLink],
        hash: t[k.privacySHA256]
    };
}

class THead extends React.Component {
    render() {

        const { text } = this.props;

        const {
            type,
            link,
            hash
        } = getText(text);

        return (
            <thead>
                <tr>
                    <td>
                        {type}
                    </td>
                    <td>
                        {link}
                    </td>
                    <td>
                        {hash}
                    </td>
                </tr>
            </thead>
        );
    }
}

THead.propTypes = {
    text: PropTypes.object.isRequired
};

export default THead;