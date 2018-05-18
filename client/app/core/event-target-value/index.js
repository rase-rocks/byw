/**
 * Wraps the DOM event and returns the value after applying the preprocessor
 */
const eventTargetValue = function (preprocessor = (value) => { return value; }) {
    
    return function (event) {
        return preprocessor(event.target.value);
    };
};

export default eventTargetValue;