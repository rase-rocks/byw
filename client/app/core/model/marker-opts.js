import { tidySVGRe } from "./regular-expressions";
import { color } from "./form/category";
import colors from "../colors";

const { globalTintColor, markerPostColor } = colors;

const groundRingColor = function (isSelected, isHighlighted) {
    return (isSelected)
        ? globalTintColor
        : (isHighlighted)
            ? markerPostColor
            : "none";
};

const svgHtml = function (flagRGB, isSelected, isHighlighted) {

    const groundColor = groundRingColor(isSelected, isHighlighted);

    const svg = `
<svg version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 30 41"
    xml:space="preserve">
    <path stroke="${groundColor}"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-miterlimit="10"
        fill="none"
        d="M 18.92,32.09 C 23.78,33.12 24.96,35.14 21.56,36.61 18.15,38.08 
        11.45,38.44 6.58,37.41 1.72,36.38 0.54,34.36 3.94,32.89 4.37,32.7 
        4.87,32.53 5.42,32.37" />
    <path stroke="none"
        fill="${flagRGB}"
        d="M 13,11 L 28,9 19.82,6 28,4 13,2 13,11 Z M 13,11" />
    <path stroke="rgb(67,67,67)"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-miterlimit="10"
        fill="rgb(67,67,67)"
        d="M 12.5,33.5 L 12.5,2.5" />
</svg>`;

    return svg.replace(tidySVGRe, "");
};

const standards = {
    className: "map-marker-icon",
    iconSize: [30, 41],
    iconAnchor: [12.5, 33.5]
};

const hash = function (isSelected, isHighlighted, normalizedValue) {
    return `${isSelected}${isHighlighted}${normalizedValue}`;
};

const makeOptsForMarker = function (cache) {
    return function (isSelected, isHighlighted, normalizedValue = 1) {

        const instanceHash = hash(isSelected, isHighlighted, normalizedValue);

        const cachedOpts = cache[instanceHash];

        if (cachedOpts) {
            return cachedOpts;
        } else {
            const html = {
                html: svgHtml(color(normalizedValue), isSelected, isHighlighted)
            };
            const opts = Object.assign({}, standards, html);
            cache[instanceHash] = opts;
            return opts;
        }
    };
};

export {
    hash,
    makeOptsForMarker
};