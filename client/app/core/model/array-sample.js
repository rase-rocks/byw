const floor = Math.floor;
const rnd = Math.random;

function random(lower, upper) {
    return lower + floor(rnd() * (upper - lower + 1));
}

function arraySample(array) {
    var length = array.length;
    return length ? array[random(0, length - 1)] : undefined;
}

export default arraySample;