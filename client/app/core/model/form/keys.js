const name = "name";
const address = "address";
const postcode = "postcode";
const timestamp = "timestamp";
const coordinates = "coordinates";
const coordinateHash = "coordinateHash";
const category = "category";

const keys = {
    name,
    address,
    postcode,
    timestamp,
    coordinates,
    coordinateHash,
    category
};

const postKeys = {
    coordinateHash,
    name,
    address,
    postcode,
    timestamp,
    category
};

const keyOrder = [coordinateHash, timestamp, name, address, postcode, coordinates, category];

export { keys, keyOrder, postKeys };