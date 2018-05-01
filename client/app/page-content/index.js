import React from "react";
import children from "../core/props-children";

class PageContainer extends React.Component {
    render() {
        return (
            <div className="container">
                <div style={{height: "100px"}}/>
                {this.props.children}
            </div>
        );
    }
}

PageContainer.propTypes = {
    children: children
};

export default PageContainer;