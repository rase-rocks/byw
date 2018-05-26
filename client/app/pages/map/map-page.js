import React from "react";
import PropTypes from "prop-types";
import hash from "../../core/hash";
import bindMethods from "../../core/bind-methods";

import Map from "./map";

const makeButton = function (clickHandler) {
    return function distButton(distance) {
        return (<button key={`dist-select-${distance}`}
            type="button"
            onClick={clickHandler}
            className="btn btn-secondary">{distance}</button>);
    };
};

const floatValue = function (event) {
    return parseFloat(event.target.innerHTML);
};

class MapPage extends React.Component {

    constructor(props) {
        super(props);

        bindMethods(this, ["onClickDistanceChange"]);
    }

    onClickDistanceChange() {
        const self = this;
        return function (e) {
            self.props.searchDistanceDidChange(floatValue(e));
        };
    }

    render() {

        const {
            filteredResults,
            searchText,
            searchValueDidChange
        } = this.props;

        const locations = filteredResults.map(location => (
            <p key={hash(location.name)}>
                {location.name}<br />
                {location.address}
            </p>
        ));

        return (

            <div>

                <div style={{ width: "100%", height: "50vh" }}>
                    <Map filteredResults={filteredResults} />
                </div>

                <div className="container full-page-content">
                    <div className="row" style={{ paddingTop: "50px" }}>
                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p>
                                                <input type="text" onChange={searchValueDidChange} value={searchText} />
                                            </p>

                                            <p>
                                                Searching For: <span>{searchText}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="btn-group" role="group" aria-label="Search Radius Selection">
                                                {[20, 50, 100].map(makeButton(this.onClickDistanceChange()))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">


                                        <div className="col-md-12">
                                            {locations}
                                        </div>


                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

MapPage.propTypes = {
    filteredResults: PropTypes.array,
    searchText: PropTypes.string,
    searchDistance: PropTypes.number,
    searchValueDidChange: PropTypes.func.isRequired,
    searchDistanceDidChange: PropTypes.func.isRequired
};

export default MapPage;