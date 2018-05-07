import sample from "lodash/sample";

const EN = "english";
const CY = "cymraeg";

export const QUOTE_LANGS = {
    EN: EN.toUpperCase(),
    CY: CY.toUpperCase()
};

export const quotes = [
    {
        CY: "Cenedl heb iaith, cenedl heb galon",
        EN: "A nation without language is a nation without heart"
    },
    {
        CY: "Benthyg dros amser byr yw popeth a geir yn y byd hwn",
        EN: "Everything you have in this world is just borrowed for a short time"
    },
    {
        CY: "Afyd a dwrg wybodaeth, a gwybodaeth ddeothineb",
        EN: "Adversity brings knowledge and knowledge wisdom"
    }
];

export function random() {
    return sample(quotes);
}