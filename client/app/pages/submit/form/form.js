import PropTypes from "prop-types";
import React from "react";

import { keys, valueForKey } from "../../../core/model/form";
import CategorySlider from "./category-slider";
import Error from "./error";
import eventTargetValue from "../../../core/event-target-value";
import capitalizeFirstLetter from "../../../core/model/string-capitalize-first-letter";

import supportedKeys from "../../../core/text/supported-keys";
const k = supportedKeys;

const SUBMIT_BUTTON_CLASSNAME = "btn btn-primary mb-2 submit-form-button";
const CLEAR_BUTTON_CLASSNAME = "btn mb-2 submit-clear-button";

const clearButtonStyle = {
    border: "2px solid #4dcb44",
    background: "none",
    color: "white"
};

const target = eventTargetValue();

const labels = {
    [keys.name]: {
        id: "byw-form-label-name",
        type: "text",
        placeholder: "Name of premises",
        placeholderKey: k.formName,
        key: "name",
        disabledForExisting: true
    },
    [keys.address]: {
        id: "byw-form-label-address",
        type: "text",
        placeholder: "Address of premises",
        placeholderKey: k.formAddress,
        key: "address",
        disabledForExisting: true
    },
    [keys.postcode]: {
        id: "byw-form-label-postcode",
        type: "text",
        placeholder: "Postcode of premises",
        placeholderKey: k.formPostcode,
        key: "postcode",
        disabledForExisting: true
    },
    [keys.coordinates]: {
        id: "byw-form-label-coordinates",
        type: "text",
        placeholder: "Coordinates",
        placeholderKey: k.formCoordinates,
        key: "coordinates",
        disabledForExisting: true,
        disabled: true
    },
    [keys.category]: {
        id: "byw-form-label-category",
        type: "text",
        placeholder: "Category",
        placeholderKey: k.formCategory,
        key: "category",
        disabledForExisting: false
    }
};

const inputMetaDataForLabel = function (key, formData, text) {
    const descriptor = labels[key];
    return Object.assign(
        {},
        descriptor,
        {
            value: valueForKey(formData, key),
            meta: formData[key],
            placeholder: text[descriptor.placeholderKey]
        });
};

const labelsArray = function (data, isDisabled, isExistingLocation, text) {
    return Object.keys(data)
        .filter(key => (key !== keys.category && key !== keys.coordinateHash && key !== keys.timestamp))
        .reduce(function (inputMetaDatas, key) {

            const metaData = inputMetaDataForLabel(key, data, text);
            metaData.disabled = (isDisabled || (metaData.disabledForExisting && isExistingLocation)) 
                ? true 
                : !!metaData.disabled;

            inputMetaDatas.push(metaData);
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

export const formatCoordinate = function (geoJsonCoordinate, placeholder) {
    if (!geoJsonCoordinate
        || geoJsonCoordinate === null
        || geoJsonCoordinate.length === 0) { return placeholder; }

    return [
        geoJsonCoordinate[1],
        geoJsonCoordinate[0]
    ].join(", ");
};

function makeFormatValue(placeholder) {
    return function formatValue (value, key) {

        let v = value;
    
        if (key === keys.coordinates) {
            v = formatCoordinate(value, placeholder);
        }
    
        return v;
    };
}

export function getText(t) {

    const text = {
        submitted: t[k.formSubmitted],
        submit: t[k.formSubmit],
        clear: t[k.formClear],
        clearForm: t[k.formClearToDrop],
        dragPin: t[k.formDragPin]
    };

    return Object
        .keys(text)
        .reduce((acc, key) => {
            acc[key] = capitalizeFirstLetter(text[key]);
            return acc;
        }, {});

}

class Form extends React.Component {
    render() {

        const { 
            text,
            data, 
            onChange, 
            onSubmit, 
            onClear, 
            isDisabled,
            isExistingLocation
        } = this.props;

        const {
            submitted,  submit,
            clear,      clearForm,
            dragPin
        } = getText(text);

        const valueFormatter = makeFormatValue(dragPin);

        const elements = labelsArray(data, isDisabled, isExistingLocation, text)
            .map(toInput(onChange, valueFormatter));

        return (
            <form className="form" onSubmit={onSubmit}>

                {elements}

                <CategorySlider onChange={onChange} form={data} isDisabled={isDisabled} />

                <div className="submit-button-wrapper">

                    <button className={SUBMIT_BUTTON_CLASSNAME} disabled={isDisabled}>
                        {(isDisabled) ? submitted : submit}
                    </button>

                    <button className={CLEAR_BUTTON_CLASSNAME} 
                        style={clearButtonStyle}
                        onClick={onClear}>
                        {clear}
                    </button>

                    <div>
                        <small>{clearForm}</small>
                    </div>

                </div>


            </form>
        );
    }
}

Form.propTypes = {
    text: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
    isExistingLocation: PropTypes.bool.isRequired,
    data: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
};

export default Form;