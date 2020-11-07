import React from "react";
import PropTypes from "prop-types";

import FetchableContainer from "../../resusable-components/FetchableContainer";
import colors from "../../core/colors";
import k from "../../core/text/supported-keys";

export function getText(text) {
    return {
        notFound: text[k.notFoundTitle]
    };
}

class NoMatch extends React.Component {
    render() {

        const { text } = this.props;

        const { notFound } = getText(text);

        return (
            <div className="full-page-content hero d-flex align-items-center">
                <div style={{ height: "100vh", width: "100%", backgroundColor: colors.mountainGreen }}>

                    <FetchableContainer backgroundColor={colors.mountainGreen}
                        url="assets/images/david-kovalenko-G85VuTpw6jg-unsplash-lossy.jpg"
                        classes="d-flex align-items-center">

                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 text-center" style={{color: "white"}}>
                                    
                                    <h1 className="font-alt">
                                        {notFound}
                                    </h1>

                                </div>
                            </div>

                        </div>

                    </FetchableContainer>

                </div>
            </div>
        );
    }
}

NoMatch.propTypes = {
    text: PropTypes.object.isRequired
};

export default NoMatch;