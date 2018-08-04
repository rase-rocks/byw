import React from "react";

import { descriptions } from "../../../../core/model/form/category";
import { strHash } from "../../../../core/hash";
import LegendItem from "./legend-item";

const toItem = function (description) {
    return (<LegendItem key={strHash(description.title)} category={description} />);
};

class Legend extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {

        const cols = descriptions.map(toItem);

        return (
            <div className="container legend-container">
                <div className="row">
                    <div className="col-md-12">
                        <p>
                            Legend to the map
                        </p>
                        <p>
                            <small>
                                A quick glympse of Welsh speaking likeliness  
                            </small>
                        </p>
                    </div>
                </div>
                <div className="row">
                    {cols}
                </div>
            </div>
        );
    }
}

export default Legend;