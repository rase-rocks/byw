const postcodeRe = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/i;
const postcodeInStringRe = /(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))/i;
const coordinateRe = /(-?\d+\.{1}\d+,{1})\s?(-?\d+\.{1}\d+)/;
const spaceRe = / /g;
const numbersRe = /[^0-9]+/g;
const coordinateHashRe = /^[a-z|0-9]{5,15}$/;
const coordinateDecimalPart = /\d+/g;

export { 
    postcodeRe, 
    postcodeInStringRe, 
    coordinateRe, 
    spaceRe, 
    numbersRe,
    coordinateHashRe,
    coordinateDecimalPart
};