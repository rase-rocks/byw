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
    },
    {
        CY: "Mae chawarae'n troi'n chwerw wrth chwarae hefo tân",
        EN: "Things turn sour when you play with fire"
    },
    {
        CY: "Deuparth gwaith yw ei ddechrau",
        EN: "Starting the work is two-thirds of it"
    },
    {
        CY: "Cartref yw cartref er tloted y bo",
        EN: "Home is home, however poor it is"
    },
    {
        CY: "Dyfal donc a dyr y garreg",
        EN: "Tapping persistently breaks the stone"
    },
    {
        CY: "Dywed yn dda am dy gyfaill, am dy elyn dywed ddim",
        EN: "Speak well of your friend, of your enemy say nothing"
    },
    {
        CY: "Y cyntaf i'r felin gaiff falu",
        EN: "The first to the mill grinds"
    },
    {
        CY: "O geiniog i geiniog yr âr arian yn bunt",
        EN: "The pennies add up to become a pound"
    }
];

export function random() {
    return sample(quotes);
}