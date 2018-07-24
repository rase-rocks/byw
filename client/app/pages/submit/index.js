import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { hasSubmissions, submissionsFromState } from "../../core/model/submission";
import Form from "./form";
import LocatorMap from "./locator-map";

// import LocatorSearchBar from "./locator-search-bar";
import PageHeader from "../../resusable-components/page-header";
import HowTo from "./how-to";
import Submissions from "./submissions";

class Submit extends React.Component {

    render() {

        const { submissions } = this.props;

        return (

            <div className="submit-container">

                <div className="container">
                    <PageHeader>
                        Submit a review
                    </PageHeader>

                    <div className="row submit-main-content">

                        <div className="col-md-6">

                            <LocatorMap />
                            {/* <LocatorSearchBar /> */}

                        </div>

                        <div className="col-md-6">

                            <Form />

                        </div>
                    </div>

                    {
                        (hasSubmissions(submissions))
                            ? (<Submissions submissions={submissionsFromState(submissions)} />)
                            : (<HowTo />)
                    }

                </div>
            </div>

        );
    }
}

Submit.propTypes = {
    submissions: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        submissions: state.submissions
    };
};

export default connect(mapStateToProps)(Submit);

