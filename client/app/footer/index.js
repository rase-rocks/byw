import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container">
                    
                </div>
            </footer >
        );
    }
}

Footer.propTypes = {
    language: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

export default connect(mapStateToProps)(Footer);