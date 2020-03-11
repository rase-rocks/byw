const createStore = require("redux").createStore;
const Provider = require("react-redux").Provider;
const React = require("react");
const MemoryRouter = require("react-router").MemoryRouter;
const Route = require("react-router-dom").Route;
const reducers = require("../client/app/core/redux/reducers").default;

const render = require("react-dom/server").renderToString;
import buildSettings from "./build-settings";
const { cssLinkString, keywords, description, title } = buildSettings;

const App = require("../client/app/app").default;
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
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">
        <link rel="canonical" href="https://www.byw.cymru/">
        <title>
            ${title}
        </title>
        ${cssLinkString}
    </head>
    <body>
    ${string}
    <script src="bundle.js"></script>
    </body>
    </html>`;
}

const page = render(
    <div id="root">
        <Provider store={store}>
            <MemoryRouter>
                <App>
                    <Route component={Home} />
                </App>
            </MemoryRouter>
        </Provider>
    </div>);

// Send the rendered document embeded into the html to the stdout
console.log(html(page));