import React from "react";
import children from "../../core/props-children";

class ContentSeparator extends React.Component {
    render() {
        return (

            <div className="content-separator">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-2">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ContentSeparator.propTypes = {
    children: children
};

export default ContentSeparator;