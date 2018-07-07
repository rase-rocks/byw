import React from "react";

import PageHeader from "../../resusable-components/page-header";
import Form from "./form";
import LocatorMap from "./locator-map";
import LocatorSearchBar from "./locator-search-bar";

class Submit extends React.Component {
    render() {
        return (

            <div className="submit-container">

                <div className="container">
                    <PageHeader>
                        Submit to our index
                    </PageHeader>

                    <div className="row">
                        <div className="col-md-4">
                            Some simple information about submitting a location to the index
                        </div>
                    </div>

                    <div className="row submit-main-content">

                        <div className="col-md-6">

                            <LocatorMap />
                            <LocatorSearchBar />
                            
                        </div>

                        <div className="col-md-6">

                            <Form />

                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default Submit;

