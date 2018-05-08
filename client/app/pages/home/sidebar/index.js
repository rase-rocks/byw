import React from "react";

class Sidebar extends React.Component {
    render() {
        return (
            <div className="col-md-3 sidebar">
                <div className="container">
                    <div className="row" style={{paddingTop: "20px"}}>
                        <div className="col-md-12">

                            <p>Search and content in here</p>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;