import React from "react";
import PropTypes from "prop-types";

class HeroSearchBar extends React.Component {

    makeSubmitHandler(onSubmit) {
        return function (e) {
            e.preventDefault();
            onSubmit();
        };
    }

    render() {

        const {
            onSubmit,
            onChange,
            searchText,
            suggestion
        } = this.props;

        const submit = this.makeSubmitHandler(onSubmit);

        return (
            <div className="search-bar">
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="form-group col-lg-5">

                            <input value={searchText}
                                onChange={onChange}
                                aria-label="Search"
                                type="search"
                                name="search"
                                autoComplete="off"
                                placeholder="What are you searching for?" />

                        </div>

                        <div className="form-group col-lg-5" onClick={submit}>

                            <input className="search-bar-selector"
                                type="text"
                                name="location"
                                aria-label="Search Results"
                                placeholder="Location"
                                id="location"
                                readOnly
                                value={suggestion} />

                        </div>

                        <div className="form-group col-lg-2 text-center">
                            <input type="submit" value="Search" className="submit" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

HeroSearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    suggestion: PropTypes.string.isRequired
};

export default HeroSearchBar;