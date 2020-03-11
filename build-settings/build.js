const createStore = require("redux").createStore;
const Provider = require("react-redux").Provider;
const React = require("react");
const MemoryRouter = require("react-router").MemoryRouter;
const Route = require("react-router-dom").Route;
const Switch = require("react-router-dom").Switch;
const reducers = require("../client/app/core/redux/reducers").default;

const render = require("react-dom/server").renderToString;

import { keywords, description, title } from "./build-settings";
import template from "./template";

const App = require("../client/app/app").default;
const Home = require("../client/app/pages/home").default;
const Map = require("../client/app/pages/map").default;
const About = require("../client/app/pages/about").default;
const Vocab = require("../client/app/pages/vocabulary").default;
const Submit = require("../client/app/pages/submit").default;
const Privacy = require("../client/app/pages/privacy").default;
const NoMatch = require("../client/app/pages/nomatch").default;

const store = createStore(reducers);

const page = render(
    <div id="root">
        <Provider store={store}>
            <MemoryRouter>
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
            </MemoryRouter>
        </Provider>
    </div>);

// Send the rendered document embeded into the html to the stdout
console.log(template(keywords, description, title, "", page));