import React from "react";
import PropTypes from "prop-types";

import k from "../../../core/text/supported-keys";

export function getText(t) {
    return {
        search:                 t[k.homeSearch],
        placeholder:            t[k.homeSearchPlaceholder],
        searchResults:          t[k.homeSearchResults],
        locationPlaceholder:    t[k.homeLocationPlaceholder]
    };
}

class HeroSearchBar extends React.Component {

    makeSubmitHandler(onSubmit) {
        return function (e) {
            e.preventDefault();
            onSubmit();
        };
    }

    render() {

        const {
            text,
            onSubmit,
            onChange,
            searchText,
            suggestion
        } = this.props;

        const {
            search,
            placeholder,
            searchResults,
            locationPlaceholder
        } = getText(text);

        const submit = this.makeSubmitHandler(onSubmit);

        return (
            <div className="search-bar">
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="form-group col-lg-5">

                            <input value={searchText}
                                onChange={onChange}
                                aria-label={search}
                                type="search"
                                name="search"
                                autoComplete="off"
                                placeholder={placeholder} />

                        </div>

                        <div className="form-group col-lg-5" onClick={submit}>

                            <input className="search-bar-selector"
                                type="text"
                                name="location"
                                aria-label={searchResults}
                                placeholder={locationPlaceholder}
                                id="location"
                                readOnly
                                value={suggestion} />

                        </div>

                        <div className="form-group col-lg-2 text-center">
                            <input type="submit" value={search} className="submit" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

HeroSearchBar.propTypes = {
    text: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    suggestion: PropTypes.string.isRequired
};

export default HeroSearchBar;