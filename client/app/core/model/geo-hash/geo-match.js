const pad = function (hash, pad) {
    return (hash + pad).substring(0, pad.length);
};

export default function (hash1, hash2, precision = 8) {
    const padding = "0".repeat(precision);
    const matchCandidate1 = pad(hash1, padding);
    const matchCandidate2 = pad(hash2, padding);
    
    return matchCandidate1 === matchCandidate2;
}