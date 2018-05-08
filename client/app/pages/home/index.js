import React from "react";
import FullPageMap from "./full-page-map";
import Sidebar from "./sidebar";
import Quote from "../../resusable-components/quote";

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="row">

                    <Sidebar/>

                    <div className="col-md-9 sidebar-content">
                        <FullPageMap />
                    </div>
                    
                </div>

                <div className="row">
                    <Quote />
                </div>

            </div>
        );
    }
}

export default Home;