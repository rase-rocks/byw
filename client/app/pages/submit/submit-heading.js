import PropTypes from "prop-types";
import React from "react";

class RowSpacer extends React.Component {
    render() {
        return (
            <div style={{ marginTop: "50px" }} />
        );
    }
}

class SubmitHeading extends React.Component {

    render() {
        return (
            <div>
                <RowSpacer />

                <div className="row ">
                    <div className="col-md-6">
                        <h4>{this.props.title}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

SubmitHeading.propTypes = {
    title: PropTypes.string.isRequired
};

export default SubmitHeading;