export default function unitsEqual(unit1, unit2) {
    return unit1.en === unit2.en &&
        unit2.cy === unit2.cy;
}