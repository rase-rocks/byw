import PropTypes from "prop-types";
import React from "react";

class Col extends React.Component {
    render() {

        const {
            title,
            description,
            url,
            alt
        } = this.props;

        return (
            <div className="item col-lg-4">
                <div className="icon"><img src={url} width="70px" alt={alt}/></div>
                <div className="text">
                    <h3 className="h4">{title}</h3>
                    <p className="text-muted">
                        {description}
                    </p>
                </div>
            </div>
        );
    }
}

Col.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

export default Col;