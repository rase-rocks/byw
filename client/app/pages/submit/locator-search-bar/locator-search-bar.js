import PropTypes from "prop-types";
import React from "react";

import eventTargetValue from "../../../core/event-target-value";
const evt = eventTargetValue();

class LocatorSearchBar extends React.Component {

    makeOnChange(changeHandler) {
        return function (e) {
            changeHandler(evt(e));
        };
    }

    render() {

        const { onChange, searchText } = this.props;

        return (
            <div className="submit-locator-search-wrapper">

                <input type="text"
                    className="text-box unbordered"
                    placeholder="Start typing a place name" 
                    value={searchText}
                    onChange={this.makeOnChange(onChange)}/>

            </div>
        );
    }
}

LocatorSearchBar.propTypes = {
    searchText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LocatorSearchBar;