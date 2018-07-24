import React from "react";
import children from "../../core/props-children";

class PageHeader extends React.Component {
    render() {
        return (

            <div className="row page-header">
                <div className="col-md-12">
                    <h2>
                        {this.props.children}
                    </h2>
                </div>
            </div>

        );
    }
}

PageHeader.propTypes = {
    children: children
};

export default PageHeader;