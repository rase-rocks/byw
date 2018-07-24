import PropTypes from "prop-types";
import React from "react";

import { keys } from "../../../../core/model/form";
import makeEventTargetValue from "../../../../core/event-target-value";
import safeParseFloat from "../../../../core/model/safe-parse-float";
import { formattedPercentage, formattedDescription } from "../../../../core/model/form/category";


const eventTargetValue = makeEventTargetValue();

const makeChangeHandler = function (propsOnChange, isDisabled) {
    if (isDisabled) { return function () {}; }
    return function (e) {
        const value = eventTargetValue(e);
        const category = (value === 0) ? 0 : value / 100;

        propsOnChange(keys.category, category);
    };
};

class CategorySlider extends React.Component {
    render() {

        const { onChange, form, isDisabled } = this.props;
        const value = safeParseFloat(form.category.value);
        const inputValue = value * 100;

        return (
            <div className="category-slider-container">
                <div className="category-slider-display">
                    <span className="float-left">{formattedDescription(value)}</span>
                    <span className="float-right">{formattedPercentage(value)}</span>
                </div>
                <div>
                    <input type="range"
                        onChange={makeChangeHandler(onChange, isDisabled)}
                        min="0"
                        max="100"
                        value={inputValue}
                        className="category-slider" />
                </div>

            </div>
        );
    }
}

CategorySlider.propTypes = {
    isDisabled: PropTypes.bool,
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CategorySlider;