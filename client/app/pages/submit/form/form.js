import PropTypes from "prop-types";
import React from "react";

import { keys, valueForKey } from "../../../core/model/form";
import CategorySlider from "./category-slider";
import Error from "./error";
import eventTargetValue from "../../../core/event-target-value";

const target = eventTargetValue();

const labels = {
    [keys.name]: {
        id: "byw-form-label-name",
        type: "text",
        placeholder: "Name of premises",
        key: "name"
    },
    [keys.address]: {
        id: "byw-form-label-address",
        type: "text",
        placeholder: "Address of premises",
        key: "address"
    },
    [keys.postcode]: {
        id: "byw-form-label-postcode",
        type: "text",
        placeholder: "Postcode of premises",
        key: "postcode"
    },
    [keys.coordinates]: {
        id: "byw-form-label-coordinates",
        type: "text",
        placeholder: "Coordinates",
        key: "coordinates",
        disabled: true
    },
    [keys.category]: {
        id: "byw-form-label-category",
        type: "text",
        placeholder: "Category",
        key: "category"
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

const toInput = function (handler, formatter) {
    return function makeLabel(labelData) {

        return (
            <span key={labelData.id} className="field">
                <Error text={labelData.meta.error} />
                <input
                    id={labelData.id}
                    type={labelData.type}
                    className="form-control mb-2 mr-sm-2"
                    placeholder={labelData.placeholder}
                    value={formatter(labelData.value, labelData.key)}
                    autoComplete="off"
                    disabled={labelData.disabled}
                    onChange={makeChangeHandler(handler, labelData)} />
            </span>
        );
    };
};

export const coordinateInputPlaceholder = "Drag the pin...";

export const formatCoordinate = function (geoJsonCoordinate) {
    if (!geoJsonCoordinate
        || geoJsonCoordinate === null
        || geoJsonCoordinate.length === 0) { return coordinateInputPlaceholder; }
        
    return [
        geoJsonCoordinate[1],
        geoJsonCoordinate[0]
    ].join(", ");
};

const formatValue = function (value, key) {

    let v = value;

    if (key === keys.coordinates) {
        v = formatCoordinate(value);
    }

    return v;
};

class Form extends React.Component {
    render() {

        const { data, onChange, onSubmit } = this.props;
        const elements = labelsArray(data).map(toInput(onChange, formatValue));

        return (
            <form className="form" onSubmit={onSubmit}>

                {elements}

                <CategorySlider onChange={onChange} form={data} />

                <div className="submit-button-wrapper">
                    <button className="btn btn-primary mb-2">Submit</button>
                </div>

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