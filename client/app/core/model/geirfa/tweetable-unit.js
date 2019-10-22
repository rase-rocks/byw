function rand() {
    return Math.random() >= 0.5;
}

function randomDirectionTranslation(unit) {
    return rand()
        ? `"${unit.en}" => "${unit.cy}"`
        : `"${unit.cy}" => "${unit.en}"`;
}

function randomTitle() {
    return rand()
        ? "Cymraeg yn gyflym"
        : "Quick Welsh";
}

export default function (unit) {
    return `${randomTitle()}: ${randomDirectionTranslation(unit)} #bywcymru`;
}