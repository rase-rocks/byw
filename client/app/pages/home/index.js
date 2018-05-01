import React from "react";
import PageContainer from "../../page-content";

class Home extends React.Component {
    render() {
        return (
            <PageContainer>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <p>
                            Welcome to the home page
                        </p>
                    </div>
                </div>
            </PageContainer>
        );
    }
}

export default Home;