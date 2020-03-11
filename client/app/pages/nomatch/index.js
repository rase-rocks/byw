import React from "react";
import FetchableContainer from "../../resusable-components/FetchableContainer";
import colors from "../../core/colors";

class NoMatch extends React.Component {
    render() {
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
                                        404 Not Found
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

export default NoMatch;