import React from "react";

import PageHeader from "../../resusable-components/page-header";

class About extends React.Component {
    render() {
        return (
            <div className="about-container">
                <div className="container">

                    <PageHeader>
                        About this service
                    </PageHeader>

                    <div className="row">
                        <div className="col-md-4">
                            <p>
                                This site is simply about getting people to use their Welsh.
                                It is all in English because it has been learners who have
                                raised the issue about where can they comfortably try out their Welsh when out and about.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <p>
                                However, this is not just about learners.
                                Those fluent need to also use their Welsh whenever they can.
                                Welsh needs to be heard on the street, in the shops and wherever we get together.
                                The map opposite illustrates why.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <p>
                                So, before you shop, go on a day out, or whatever you like to do,
                                see if there will be a Welsh language welcome and, above all, use your Welsh yourself!
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default About;