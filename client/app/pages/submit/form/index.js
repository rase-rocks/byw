import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { 
    setFormDataAction, 
    submitFormAction 
} from "../../../core/redux/actions";
import Form from "./form";
import bindMethods from "../../../core/bind-methods";

class FormController extends React.Component {

    constructor(props) {
        super(props);
        bindMethods(this, ["handler", "submit"]);
    }

    handler() {
        const self = this;
        return function (key, value) {
            self.props.dispatch(setFormDataAction(key, value));
        };
    }

    submit() {
        const self = this;
        return function (e) {
            e.preventDefault();
            self.props.dispatch(submitFormAction());
        };
    }

    render() {

        return (
            <Form data={this.props.data}
                onChange={this.handler()}
                onSubmit={this.submit()} />
        );
    }
}

FormController.propTypes = {
    data: PropTypes.object
};

const mapStateToProps = function (state) {
    return {
        data: state.form
    };
};

export default connect(mapStateToProps)(FormController);