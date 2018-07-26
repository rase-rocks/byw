const locationNotEqual = function (loc1, loc2) {
    return loc1.coordinateHash !== loc2.coordinateHash;
};

export default locationNotEqual;