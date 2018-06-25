import React from "react";

import PageContainer from "../../page-content";
import PageHeader from "../../resusable-components/page-header";
import Form from "./form";

class Submit extends React.Component {
    render() {
        return (

            <PageContainer>
                <div className="container">

                    <PageHeader>
                        Submit to our index
                    </PageHeader>

                    <div className="row">
                        <div className="col-md-4">
                            Some simple information about submitting a location to the index
                        </div>
                    </div>

                    <div className="row" style={{marginTop: "50px"}}>
                        <div className="col-md-6 offset-md-3">

                            <Form/>

                        </div>
                    </div>

                </div>
            </PageContainer>);
    }
}

export default Submit;

