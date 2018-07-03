import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import { privacyRoute } from "./pages/privacy";
import { route } from "./nav";
import About from "./pages/about";
import App from "./app";
import Home from "./pages/home";
import isBrowser from "./core/is-browser";
import makeApiClient from "./core/api-client";
import makeFilterLocationsMiddleware from "./core/redux/middleware/filter-locations-middleware";
import makeRequestLocationsMiddleware from "./core/redux/middleware/request-locations-middleware";
import makeSubmitMiddleware from "./core/redux/middleware/submit-middleware";
import MapPage from "./pages/map";
import Privacy from "./pages/privacy";
import reducers from "./core/redux/reducers";
import Submit from "./pages/submit";

const isStaging = function () {
    if (!isBrowser()) { return false; }
    return window.location.hostname.includes("github"); // Temp fix for gh-pages staging environment
};

if (isBrowser()) {
    const container = document.getElementById("root");

    if (container) {

        const api = makeApiClient(fetch);

        const store = createStore(
            reducers,
            applyMiddleware(makeRequestLocationsMiddleware(api),
                makeFilterLocationsMiddleware(api),
                makeSubmitMiddleware(api)));


        if (isStaging()) {
            ReactDOM.render(<Redirect to="/" />, container);
        } else {
            const routes = [
                (<Route key="1" path={route.home} exact component={Home} />),
                (<Route key="2" path={route.map} component={MapPage} />),
                (<Route key="3" path={route.about} component={About} />),
                (<Route key="4" path={route.submit} component={Submit} />),
                (<Route key="5" path={privacyRoute.url} component={Privacy} />)
            ];
    
            ReactDOM.render(
                <Provider store={store}>
                    <BrowserRouter>
                        <App>
                            {routes}
                        </App>
                    </BrowserRouter>
                </Provider>
                , container);
        }
    }
}