import isInside from "../polygon-contains";

export const makeFilter = function (polygon, getter) {
    return function (item) {
        const coordinate = getter(item);
        return isInside(coordinate, polygon);
    };
};

const filterCoordinates = function (boundary, points, getter) {
    return new Promise(function (resolve) {
        resolve(points.filter(makeFilter(boundary, getter)));
    });
};

export default filterCoordinates;