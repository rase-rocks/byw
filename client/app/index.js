import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";
import isBrowser from "./core/is-browser";

import makeApiClient from "./core/api-client";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./core/redux/reducers";
import makeRequestLocationsMiddleware from "./core/redux/middleware/request-locations-middleware";
import makeFilterLocationsMiddleware from "./core/redux/middleware/filter-locations-middleware";
import makeSubmitMiddleware from "./core/redux/middleware/submit-middleware";

import App from "./app";
import Home from "./pages/home";
import MapPage from "./pages/map";
import About from "./pages/about";
import Submit from "./pages/submit";

if (isBrowser()) {
    const container = document.getElementById("root");

    if (container) {

        const api = makeApiClient(fetch);

        const store = createStore(
            reducers,
            applyMiddleware(makeRequestLocationsMiddleware(api),
                makeFilterLocationsMiddleware(api),
                makeSubmitMiddleware(api)));

        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        <Route path="/" exact component={Home} />
                        <Route path="/map" component={MapPage} />
                        <Route path="/about" component={About} />
                        <Route path="/submit" component={Submit} />
                    </App>
                </BrowserRouter>
            </Provider>
            , container);
    }
}