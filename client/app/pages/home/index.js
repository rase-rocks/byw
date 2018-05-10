import React from "react";
import Quote from "../../resusable-components/quote";

class Home extends React.Component {
    render() {
        return (
            <div className="full-page-content">

                <div className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">

                                <h1>
                                    Hero content
                                </h1>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container half-page-content">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>The containerised content</h2>
                        </div>
                    </div>
                </div>

                <Quote/>
            </div>
        );
    }
}

export default Home;