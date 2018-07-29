import clamp from "../clamp";

export const descriptions = [
    { title: "Highly unlikely", color: "rgb(255,228,196)" },
    { title: "Not very likely", color: "rgb(255,192,203)" },
    { title: "Likely", color: "rgb(123,104,238)" },
    { title: "Very likely", color: "rgb(65,105,225)" },
    { title: "Highly likely", color: "rgb(0,0,205)" },
    { title: "Definitely", color: "rgb(25,25,112)" }
];

const ceil = Math.ceil;

const keys = {
    title: "title",
    color: "color"
};

const v = function (value) {
    return clamp(value, 0, 1);
};

const index = function (value) {
    return ceil(descriptions.length * v(value)) - 1;
};

const output = function (value, key) {
    const idx = index(value);
    return (idx <= 0)
        ? descriptions[0][key]
        : descriptions[idx][key];
};

export const formattedPercentage = function (value) {
    const percentage = (v(value) * 100).toFixed(0);
    return `${percentage}%`;
};

export const formattedDescription = function (value) {
    return output(value, keys.title);
};

export const color = function (value) {
    return output(value, keys.color);
};