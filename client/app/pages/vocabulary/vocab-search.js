import React from "react";
import PropTypes from "prop-types";

class VocabSearch extends React.Component {
    render() {
        return (
            <div className="row" style={{marginBottom: "20px"}}>
                <div className="col col-12">
                    <input className="vocab-search"
                        type="text"
                        value={this.props.value}
                        onChange={this.props.onChange}
                        placeholder="Search for / Chwilio am..." />
                </div>
            </div>
        );
    }
}

VocabSearch.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default VocabSearch;