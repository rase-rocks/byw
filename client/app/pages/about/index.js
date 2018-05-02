import React from "react";
import PageContainer from "../../page-content";

class About extends React.Component {
    render() {
        return (
            <PageContainer>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h1>
                            About this project
                        </h1>
                        <p>
                            This is the about page
                        </p>
                    </div>
                </div>
            </PageContainer>
        );
    }
}

export default About;