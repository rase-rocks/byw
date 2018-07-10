import { postcodeInStringRe } from "../client/app/core/model/regular-expressions";

const parsePostcode = function (address = "") {

    const matches = postcodeInStringRe.exec(address);
    
    return (matches && matches !== null)
        ? (matches.length > 1)
            ? matches[0]
            : ""
        : "";
};

export default parsePostcode;