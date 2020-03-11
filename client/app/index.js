import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import isBrowser from "./core/is-browser";
import makeApiClient from "./core/api-client";
import makeFilterLocationsMiddleware from "./core/redux/middleware/filter-locations-middleware";
import makeRequestLocationsMiddleware from "./core/redux/middleware/request-locations-middleware";
import makeSubmitMiddleware from "./core/redux/middleware/submit-middleware";
import makeLocatorMiddleware from "./core/redux/middleware/locator-middleware";
import reducers from "./core/redux/reducers";

import App from "./app";
import Home from "./pages/home";
import Map from "./pages/map";
import Vocab from "./pages/vocabulary";
import About from "./pages/about";
import Submit from "./pages/submit";
import Privacy from "./pages/privacy";
import NoMatch from "./pages/nomatch";

if (isBrowser()) {
    const container = document.getElementById("root");

    if (container) {

        const api = makeApiClient(fetch);

        const store = createStore(
            reducers,
            applyMiddleware(makeRequestLocationsMiddleware(api),
                makeFilterLocationsMiddleware(api),
                makeSubmitMiddleware(api),
                makeLocatorMiddleware(api)
            ));

        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
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
                </BrowserRouter>
            </Provider>
            , container);

    }
}