import clamp from "../clamp";

export const descriptions = [
    "Highly unlikely",
    "Not very likely", 
    "Likely",
    "Very likely", 
    "Highly likely",
    "Definitely"
];

const ceil = Math.ceil;

const v = function (value) {
    return clamp(value, 0, 1);
};

export const formattedPercentage = function (value) {
    const percentage = (v(value) * 100).toFixed(0);
    return `${percentage}%`;
};

export const formattedDescription = function (value) {
    const index = ceil(descriptions.length * v(value)) - 1;    
    return (index <= 0) 
        ? descriptions[0] 
        : descriptions[index];
};