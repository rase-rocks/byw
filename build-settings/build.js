const React = require("react");

const Provider = require("react-redux").Provider;
const createStore = require("redux").createStore;
const reducers = require("../client/app/core/redux/reducers").default;

const render = require("react-dom/server").renderToString;
import buildSettings from "./build-settings";
const { cssLinkString, keywords, description, title } = buildSettings;

const Home = require("../client/app/pages/home").default;

const store = createStore(reducers);

function html(string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords" content="${keywords}">
        <meta name="description" content="${description}">
        <title>
            ${title}
        </title>
        ${cssLinkString}
    </head>
    <body>
    ${string}
    <script src="/bundle.js"></script>
    </body>
    </html>`;
}

const page = render(<div id="root"><Provider store={store}><Home /></Provider></div>);

// Send the rendered document embeded into the html to the stdout
console.log(html(page));