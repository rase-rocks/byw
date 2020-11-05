import clamp from "../clamp";
import supportedLanguages from "../../text/supported-languages";
import supportedKeys from "../../text/supported-keys";

import text from "../../text/data";

const {
    category0,
    category1,
    category2,
    category3,
    category4,
    category5
} = supportedKeys;

export const descriptions = [
    { color: "rgb(255,228,196)", titleKey: category0 },
    { color: "rgb(255,192,203)", titleKey: category1 },
    { color: "rgb(123,104,238)", titleKey: category2 },
    { color: "rgb(65,105,225)", titleKey: category3 },
    { color: "rgb(0,0,205)", titleKey: category4 },
    { color: "rgb(25,25,112)", titleKey: category5 }
];

const ceil = Math.ceil;

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

export function formattedPercentage(value) {
    const percentage = (v(value) * 100).toFixed(0);
    return `${percentage}%`;
}

export function formattedDescription(value, language = supportedLanguages.english, content = text) {
    const category = output(value, "titleKey");
    return content[language][category];
}

export function color(value) {
    return output(value, "color");
}