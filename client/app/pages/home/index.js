import React from "react";
import FullPageMap from "./full-page-map";
import Quote from "../../resusable-components/quote";

class Home extends React.Component {
    render() {
        return (
            <div>
                <FullPageMap />
                <Quote/>
            </div>
        );
    }
}

export default Home;