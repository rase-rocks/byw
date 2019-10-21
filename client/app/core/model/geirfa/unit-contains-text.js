export default function unitContainsText(unit, text) {

    const wordMatches = (~unit.en.toLowerCase().indexOf(text) || ~unit.cy.toLowerCase().indexOf(text)) 
        ? true 
        : false;

    const tagMatches = unit.tags.filter((tag) => { return tag.indexOf(text) != -1; });

    return wordMatches || tagMatches.length > 0;

}