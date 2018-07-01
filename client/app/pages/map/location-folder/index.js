import PropTypes from "prop-types";
import React from "react";

import { formattedDescription }from "../../../core/model/form/category";
import hash from "../../../core/hash";

class LocationFolder extends React.Component {
    render() {

        const {locations, onShowLocation} = this.props;

        const rows = locations.map(location => {
            return (
                <tr key={hash(location.name)}>
                    <td>
                        {location.name}<br/>
                        <small>
                            {formattedDescription(location.category)}
                        </small>
                    </td>
                    <td><small>{location.address}</small></td>
                    <td>
                        <button className="btn" onClick={onShowLocation(location)}>Show</button>
                    </td>
                </tr>
            );
        });

        return (
            <table className="table">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

LocationFolder.propTypes = {
    locations: PropTypes.array.isRequired,
    onShowLocation: PropTypes.func.isRequired
};

export default LocationFolder;