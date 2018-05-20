/**
 * Wraps the DOM event and returns the value after applying the preprocessor
 */
const eventTargetValue = function (preprocessor = (value) => { return value; }) {
    
    return function (event) {
        const value = event.target.value || "";
        const processed = preprocessor(value);
        
        if (typeof processed == "number") {
            return (isNaN(processed)) ? 0 : processed;
        }

        return processed;
    };
};

export default eventTargetValue;