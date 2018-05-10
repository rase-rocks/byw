import React from "react";
import FullPageMap from "./full-page-map";

class MapPage extends React.Component {
    render() {
        return (

            <div>

                <div style={{ width: "100%", height: "50vh" }}>
                    <FullPageMap />
                </div>

                <div className="container full-page-content">
                    <div className="row">
                        <div className="col-md-12">
                            <p>Under map content</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapPage;