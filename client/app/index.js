import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";
import isBrowser from "./core/is-browser";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./core/redux/reducers";
import requestLocationsMiddleware from "./core/redux/middleware/request-locations-middleware";

import App from "./app";
import Home from "./pages/home";
import MapPage from "./pages/map";
import About from "./pages/about";

if (isBrowser()) {
    const container = document.getElementById("root");

    if (container) {

        const store = createStore(
            reducers, 
            applyMiddleware(requestLocationsMiddleware));

        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        <Route path="/" exact component={Home} />
                        <Route path="/map" component={MapPage}/>
                        <Route path="/about" component={About} />
                    </App>
                </BrowserRouter>
            </Provider>
            , container);
    }
}