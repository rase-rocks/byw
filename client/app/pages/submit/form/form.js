import PropTypes from "prop-types";
import React from "react";

import Error from "./error";
import { keys, valueForKey } from "../../../core/model/form";
import eventTargetValue from "../../../core/event-target-value";
import CategorySlider from "./category-slider";

const target = eventTargetValue();

const labels = {
    [keys.name]: {
        id: "byw-form-label-name",
        type: "text",
        placeholder: "Name"
    },
    [keys.address]: {
        id: "byw-form-label-address",
        type: "text",
        placeholder: "Address"
    },
    [keys.postcode]: {
        id: "byw-form-label-postcode",
        type: "text",
        placeholder: "Postcode"
    },
    [keys.coordinates]: {
        id: "byw-form-label-coordinates",
        type: "text",
        placeholder: "Coordinates"
    },
    [keys.category]: {
        id: "byw-form-label-category",
        type: "text",
        placeholder: "Cat"
    }
};

const inputMetaDataForLabel = function (key, formData) {
    return Object.assign(
        {}, 
        labels[key], 
        {
            value: valueForKey(formData, key),
            meta: formData[key]
        });
};

const labelsArray = function (data) {
    return Object.keys(data)
        .filter(key => key !== keys.category) // remove the category field as this is going to be a slider
        .reduce(function (inputMetaDatas, key) {
            inputMetaDatas.push(inputMetaDataForLabel(key, data));
            return inputMetaDatas;
        }, []);
};

const makeChangeHandler = function (handler, data) {
    return function (e) {
        handler(data.meta.key, target(e));
    };
};

const toInput = function (handler) {
    return function makeLabel(labelData) {
        
        return (
            <span key={labelData.id}>
                <Error text={labelData.meta.error} />
                <input
                    id={labelData.id}
                    type={labelData.type}
                    className="form-control mb-2 mr-sm-2"
                    placeholder={labelData.placeholder}
                    value={labelData.value}
                    onChange={makeChangeHandler(handler, labelData)} />
            </span>
        );
    };
};

class Form extends React.Component {
    render() {
        
        const { data, onChange, onSubmit } = this.props;
        const elements = labelsArray(data).map(toInput(onChange));

        return (
            <form className="form" onSubmit={onSubmit}>

                {elements}

                <CategorySlider onChange={onChange} form={data}/>
                <button className="btn btn-primary mb-2">Submit</button>
            </form>
        );
    }
}

Form.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Form;