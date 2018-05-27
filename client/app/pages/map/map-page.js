import React from "react";
import PropTypes from "prop-types";
import hash from "../../core/hash";
import bindMethods from "../../core/bind-methods";

import Map from "./map";

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
            <div key={hash(location.name)} className="map-result">
                {location.name}<br />
                <small>{location.address}</small><br/>
                <button>Show me...</button>
            </div>
        ));

        return (

            <div className="map-grid-container">

                <div className="map-item">
                    <Map filteredResults={filteredResults} />
                </div>

                <div className="map-item">

                    <div className="map-item-padding">

                        <div className="map-search-container">
                            <div>
                                <input type="text"
                                    className="text-box"
                                    onChange={searchValueDidChange}
                                    value={searchText}
                                    placeholder=":Search" />
                            </div>
                        </div>

                        <div className="map-results-container">
                            {locations}
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