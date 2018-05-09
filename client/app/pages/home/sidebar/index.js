import React from "react";

import ResultsTable from "./results-table";

class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-md-3 sidebar">
                <div className="container">
                    <div className="row" style={{ paddingTop: "20px" }}>
                        <div className="col-md-12">


                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Search..." />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">Go</button>
                                </div>
                            </div>

                            <ResultsTable/>
                            

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;