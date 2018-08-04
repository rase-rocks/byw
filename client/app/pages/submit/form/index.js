import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import {
    setFormDataAction,
    clearFormAction,
    submitFormAction
} from "../../../core/redux/actions";
import { matchesPreviousSubmission } from "../../../core/model/submission";
import { valueForKey, keys } from "../../../core/model/form";
import Form from "./form";
import bindMethods from "../../../core/bind-methods";

class FormController extends React.Component {

    constructor(props) {
        super(props);
        bindMethods(this, [
            "makeChangeHandler",
            "makeSubmitHandler",
            "makeClearHandler"
        ]);
    }

    makeChangeHandler() {
        const self = this;
        return function (key, value) {
            self.props.dispatch(setFormDataAction(key, value));
        };
    }

    makeClearHandler() {
        const self = this;
        return function (e) {
            e.preventDefault();
            self.props.dispatch(clearFormAction());
        };
    }

    makeSubmitHandler() {
        const self = this;
        return function (e) {
            e.preventDefault();
            self.props.dispatch(submitFormAction());
        };
    }

    render() {

        const { data, submissions } = this.props;
        const coordinateHash = valueForKey(data, keys.coordinateHash);
        const isDisabled = matchesPreviousSubmission(coordinateHash, submissions);

        return (
            <Form isDisabled={isDisabled}
                data={data}
                onChange={this.makeChangeHandler()}
                onSubmit={this.makeSubmitHandler()}
                onClear={this.makeClearHandler()} />
        );
    }
}

FormController.propTypes = {
    data: PropTypes.object.isRequired,
    submissions: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        data: state.form,
        submissions: state.submissions
    };
};

export default connect(mapStateToProps)(FormController);