import clamp from "./clamp";

const normalize = function (value) {
    return clamp(value, 0, 1);
};

const adjustedCategoryFromValues = (oldValue, newValue, factor = 3) => {

    const distance = (Math.abs(normalize(newValue) - normalize(oldValue)) / clamp(factor, 1, 5));
    return (oldValue > newValue) ?
        oldValue - distance :
        oldValue + distance;
};

const locationUpdateCategory = function (location, targetCategory) {
    const category = adjustedCategoryFromValues(location.category, targetCategory);
    return Object.assign({}, location, { category });
};

export default locationUpdateCategory;