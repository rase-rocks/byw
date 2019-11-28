import arraySample from "../array-sample";

function select(num, units) {

    const results = {};

    while (Object.keys(results).length < num) {
        const unit = arraySample(units);
        results[unit.id] = unit;
    }

    return Object.values(results);
        
}

export default select;