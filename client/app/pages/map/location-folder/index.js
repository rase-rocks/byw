import PropTypes from "prop-types";
import React from "react";

import { formattedDescription, formattedPercentage } from "../../../core/model/form/category";
import hash from "../../../core/hash";

import k from "../../../core/text/supported-keys";

export function getText(t) {
    return {
        categorise: t[k.categorise],
        show:       t[k.show]
    };
}

class LocationFolderController extends React.Component {

    makeOnReview(location, onReview) {
        return function () {
            onReview(location);
        };
    }

    render() {

        const { 
            text,
            locations, 
            onShowLocation, 
            onReview 
        } = this.props;

        const {
            categorise,
            show
        } = getText(text);

        const rows = locations.map(location => {
            return (
                <tr key={hash(location.name)}>
                    <td>
                        {location.name}<br />
                        <small>
                            {formattedDescription(location.category)}, {formattedPercentage(location.category)}
                        </small>
                        <button className="search-result-submit-btn"
                            onClick={this.makeOnReview(location, onReview)}>{categorise}</button>
                    </td>
                    <td><small>{location.address}</small></td>
                    <td>
                        <button className="btn btn-primary has-shadow"
                            onClick={onShowLocation(location)}>{show}</button>
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

LocationFolderController.propTypes = {
    text: PropTypes.object.isRequired,
    locations: PropTypes.array.isRequired,
    onShowLocation: PropTypes.func.isRequired,
    onReview: PropTypes.func.isRequired
};

export default LocationFolderController;