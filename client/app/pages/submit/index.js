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

import text from "../../core/text/data";
import supportedKeys from "../../core/text/supported-keys";

export function getText(t) {
    return {
        title: t[supportedKeys.submitTitle]
    };
}

class Submit extends React.Component {

    render() {

        const { language, submissions } = this.props;
        const content = text[language];

        const { title } = getText(content);

        return (

            <div className="submit-container">

                <div className="container">

                    <PageHeader>
                        {title}
                    </PageHeader>

                    <div className="row submit-main-content">

                        <div className="col-md-6">

                            <LocatorMap />
                            {/* <LocatorSearchBar /> */}

                        </div>

                        <div className="col-md-6">

                            <Form text={content}/>

                        </div>
                    </div>

                    {
                        (hasSubmissions(submissions))
                            ? (<Submissions text={content} submissions={submissionsFromState(submissions)} />)
                            : (<HowTo text={content}/>)
                    }

                </div>
            </div>

        );
    }
}

Submit.propTypes = {
    language: PropTypes.string.isRequired,
    submissions: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language,
        submissions: state.submissions
    };
};

export default connect(mapStateToProps)(Submit);

