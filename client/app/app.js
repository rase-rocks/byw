import React from "react";

import Nav from "./nav";
import Home from "./pages/home";

class App extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
                <Home/>
            </div>
        );
    }
}

export default App;