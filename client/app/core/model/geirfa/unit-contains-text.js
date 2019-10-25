import tokens from "./tokens";

function matches(searchText, tokenizedWords) {

    const searchTokens = tokens(searchText).map(t => t.toLowerCase());

    if (searchTokens.length === 0) { return false; }

    for (let i = 0; i < searchTokens.length; i++) {
    
        const searchToken = searchTokens[i].toLowerCase();

        for (let j = 0; j < tokenizedWords.length; j++) {

            if (tokenizedWords[j].indexOf(searchToken) != -1) { return true; }

        }
    }

    return false;

}

export default function unitContainsText(unit, text) {

    const candidates = [].concat(
        tokens(unit.en.toLowerCase()),
        tokens(unit.cy.toLowerCase()),
        unit.tags);

    return matches(text, candidates);
}