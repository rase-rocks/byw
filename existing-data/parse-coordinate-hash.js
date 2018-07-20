import hash from "../client/app/core/hash";

const parseCoodinateHash = function (coordinates) {
    return hash(coordinates);
};

export default parseCoodinateHash;