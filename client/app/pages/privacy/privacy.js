import React from "react";
import PropTypes from "prop-types";

import PageContainer from "../../page-content";
import THead from "./thead";
import Tr from "./tr";

const files = [
    {
        fileType: "PDF",
        url: "assets/downloads/Privacy.pdf",
        filename: "Privacy.pdf",
        hash: "8fd3de2f919038ceab4cf51b1cc310eda9744e3dd2618454b4d10b58b3434226"
    },
    {
        fileType: "Markdown",
        url: "assets/downloads/Privacy.md",
        filename: "Privacy.md",
        hash: "9ed5655625b7ca2e7e4b9a1f9e8bb14b45f7275c4066c17278eee05f02a8b1c4"
    }
];

const fileComponents = files.map(meta => {
    return (<Tr key={meta.hash} {...meta} />);
});

class Privacy extends React.Component {
    render() {

        const { text } = this.props;

        return (
            <PageContainer>
                <div className="container">
                    <section id="privacy-policy-details">
                        <div className="row">
                            <div className="col-md-12">

                                <h2>Privacy Notice for BYW (byw.cymru)</h2>
                                <p>We want everyone who visits the BYW website to feel comfortable that their data will not be used or shared  without their express permission. We are not a company, just a small group of private individuals who want to do what is best for the Welsh language in Wales and across the world.  This notice provides information on how we collect data and what we currently do with it just in case you need a little more assurance.</p>

                                <h2>Types of Data We Collect</h2>
                                <p>This website does not use any third party user tracking system and does not use cookies. Cookies are small text files that can be stored on your system to record minor configuration settings such as language preference or last page visited etc.</p>

                                <h2>Collection of Data</h2>
                                <p>The only data collected is that intentionally supplied by the user of byw.cymru. Currently this is in the form of a submission on the &apos;Submit&apos; page. Only the information provided by the user is recorded. This claim can be verified by monitoring the web connections made by the browser whilst submitting a location to the index. Most modern web browsers allow for this sort of inspection of traffic.</p>

                                <h2>Sharing Information and Mailing Lists</h2>
                                <p>This website does not collect any user information and therefore also does not share any information regarding to the users of this site.</p>

                                <h2>Changes to this Privacy Notice</h2>
                                <p>There are no plans to increase the scope of what we do but, whenever we do, this policy will be reviewed. This version was written on the 9th March, 2021.</p>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table">
                                        <THead text={text} />
                                        <tbody>
                                            {fileComponents}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PageContainer >
        );
    }
}

Privacy.propTypes = {
    text: PropTypes.object.isRequired
};

const privacyRoute = {
    url: "/privacy",
    title: "Privacy"
};

export default Privacy;
export { privacyRoute };