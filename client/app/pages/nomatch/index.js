import React from "react";
import FetchableSectionBackground from "../../resusable-components/FetchableSectionBackground";
import colors from "../../core/colors";

class NoMatch extends React.Component {
    render() {
        return (
            <div className="full-page-content">
                <FetchableSectionBackground backgroundColor={colors.mountainGreen}
                    url="assets/images/david-kovalenko-G85VuTpw6jg-unsplash-lossy.jpg"
                    classes="hero d-flex align-items-center">

                    <div className="container">

                        <h1>
                            404 - Not Found
                        </h1>

                    </div>

                </FetchableSectionBackground>
            </div>
        );
    }
}

export default NoMatch;