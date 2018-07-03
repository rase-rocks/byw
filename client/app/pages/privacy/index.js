import React from "react";

import PageContainer from "../../page-content";
import THead from "./thead";
import Tr from "./tr";

const files = [
    {
        fileType: "PDF",
        url: "assets/downloads/Privacy.pdf",
        filename: "Privacy.pdf",
        hash: "e4601e98a76a93980fba7d94bb49554799df487066641fa98bcb1f7c1120a05f"
    },
    {
        fileType: "Markdown",
        url: "assets/downloads/Privacy.md",
        filename: "Privacy.md",
        hash: "7d02ef99fc379acfbb2b1849b6378f44509069eb34acc9e1616cca6b2463965f"
    }
];

const fileComponents = files.map(meta => {
    return (<Tr key={meta.hash} {...meta} />);
});

class Privacy extends React.Component {
    render() {
        return (
            <PageContainer>
                <div className="container">
                    <section id="privacy-policy-details">
                        <div className="row">
                            <div className="col-md-12">

                                <h2>Privacy Notice for BYW (breatheyourwelsh.cymru)</h2>
                                <p>We want everyone who visits the BYW website to feel comfortable that their data will not be used or shared  without their express permission. We are not a company, just a small group of private individuals who want to do what is best for the Welsh language in Wales and across the world.  This notice provides information on how we collect data and what we currently do with it just in case you need a little more assurance.</p>
                                <h2>Types of Data We Collect</h2>
                                <p>When someone visits www.breatheyourwelsh.cymru we use a third party service, Google Visitor Analytics, to collect standard internet log information and details of visitor behaviour patterns. We do this to find out things such as the number of visitors to the various parts of the site. This information is only processed in a way which does not identify anyone. We do not make, and do not allow Google or any one else to make, any attempt to find out the identities of those visiting our website.</p>
                                <h2>Collection of Data</h2>
                                <p>The only personal data we are currently going to collect are the email addresses of those who have contacted us which may include your name. We will not collect any other personal information such as gender or address. We only use the information to tell you about things you’ve asked us to tell you about; to contact you if we need to obtain or provide additional information or to check our records are right and to check every now and then that you’re happy and satisfied. We don’t rent or trade email lists with other organisations and businesses.</p>
                                <h2>Sharing Information and Mailing Lists</h2>
                                <p>We may share anonymised personal information with other organisations for the purposes of promoting the Welsh language. We will never give anyone else your details such as an email address unless you have expressly agreed to this.<br />
                                    When sending a group email only your own email details will be visible, not those of others who have received the same information.</p>
                                <h2>Access to Your Personal Information</h2>
                                <p>If you want to view, amend or delete your personal data then contact Peter Allen at byw@breatheyourwelsh.cymru.</p>
                                <h2>Changes to this Privacy Notice</h2>
                                <p>There are no plans to increase the scope of what we do but, whenever we do, this policy will be reviewed. This version was written on the 30th June, 2018.</p>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table">
                                        <THead />
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

const privacyRoute = {
    url: "/privacy",
    title: "Privacy"
};

export default Privacy;
export { privacyRoute };