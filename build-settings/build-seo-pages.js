const createStore = require("redux").createStore;
const Provider = require("react-redux").Provider;
const React = require("react");
const StaticRouter = require("react-router").StaticRouter;
const Route = require("react-router-dom").Route;
const Switch = require("react-router-dom").Switch;
const reducers = require("../client/app/core/redux/reducers").default;

const renderToString = require("react-dom/server").renderToString;

import template from "./template";

import { titleTag, keywordsTag, descriptionTag } from "../client/app/nav/routes";

const App = require("../client/app/app").default;
const Home = require("../client/app/pages/home").default;
const Map = require("../client/app/pages/map").default;
const About = require("../client/app/pages/about").default;
const Vocab = require("../client/app/pages/vocabulary").default;
const Submit = require("../client/app/pages/submit").default;
const Privacy = require("../client/app/pages/privacy").default;
const NoMatch = require("../client/app/pages/nomatch").default;

const store = createStore(reducers);

const pagesToBuild = [
    "map",
    "about",
    "vocabulary",
    "submit",
    "privacy",
    "404.html"
];

const context = {};

const pages = pagesToBuild.map(function (pageName) {

    const path = "/" + pageName;

    const htmlString = renderToString(
        <div id="root">
            <Provider store={store}>
                <StaticRouter context={context} location={path}>
                    <App>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/map" component={Map} />
                            <Route path="/about" component={About} />
                            <Route path="/vocabulary" component={Vocab} />
                            <Route path="/submit" component={Submit} />
                            <Route path="/privacy" component={Privacy} />
                            <Route path="*" component={NoMatch} />
                        </Switch>
                    </App>
                </StaticRouter >
            </Provider>

        </div>
    );

    return {
        pageName: pageName,
        html: template(keywordsTag(path), descriptionTag(path), titleTag(path), pageName, htmlString)
    };

});

console.log(JSON.stringify(pages));