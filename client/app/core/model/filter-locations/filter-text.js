import makeFilter from "./make-filter";

const match = function (string) {
    const search = string.toLowerCase();
    return function (location) {
        return ~location.name.toLowerCase().indexOf(search) || ~location.address.toLowerCase().indexOf(search);
    };
};

export default makeFilter(match);