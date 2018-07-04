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

        const { onSubmit, searchText, onChange } = this.props;

        return (
            <div className="search-bar">
                <form onSubmit={this.makeSubmitHandler(onSubmit)}>
                    <div className="row">
                        <div className="form-group col-lg-9">
                            <input
                                type="search"
                                name="search"
                                placeholder="What are you searching for?"
                                value={searchText}
                                onChange={onChange} />
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
    searchText: PropTypes.string.isRequired
};

export default HeroSearchBar;