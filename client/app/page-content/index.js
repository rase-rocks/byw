import React from "react";
import children from "../core/props-children";

class PageContainer extends React.Component {
    render() {
        return (
            <div className="container" style={{minHeight: "100vh"}}>
                {this.props.children}
            </div>
        );
    }
}

PageContainer.propTypes = {
    children: children
};

export default PageContainer;