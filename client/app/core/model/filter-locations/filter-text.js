import makeFilter from "./make-filter";

const match = function (string) {
    return function (location) {
        return ~location.name.toLowerCase().indexOf(string) || ~location.address.toLowerCase().indexOf(string);
    };
};

export default makeFilter(match);