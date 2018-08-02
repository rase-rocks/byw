import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import { privacyRoute } from "./pages/privacy";
import { route } from "./nav";

// import About from "./pages/about";
import App from "./app";
import Home from "./pages/home";
import isBrowser from "./core/is-browser";
import makeApiClient from "./core/api-client";
import makeFilterLocationsMiddleware from "./core/redux/middleware/filter-locations-middleware";
import makeRequestLocationsMiddleware from "./core/redux/middleware/request-locations-middleware";
import makeSubmitMiddleware from "./core/redux/middleware/submit-middleware";
import makeLocatorMiddleware from "./core/redux/middleware/locator-middleware";
import MapPage from "./pages/map";
import Privacy from "./pages/privacy";
import reducers from "./core/redux/reducers";
import Submit from "./pages/submit";

const routes = [
    { url: route.home, component: Home },
    { url: route.map, component: MapPage },
    //{ url: route.about, component: About },
    { url: route.submit, component: Submit },
    { url: privacyRoute.url, component: Privacy }
];

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


        const components = routes.map(function (route, i) {
            return (<Route key={`route-${i}`} exact path={route.url} component={route.component} />);
        });

        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        {components}
                    </App>
                </BrowserRouter>
            </Provider>
            , container);

    }
}