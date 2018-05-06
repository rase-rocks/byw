import React from "react";
import PageContainer from "../../page-content";

class About extends React.Component {
    render() {
        return (
            <PageContainer>
                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <h1>
                                About this service
                            </h1>
                        </div>
                    </div>

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
                        <div className="col-md-4">
                            <p>
                                Oh, and if you find a place not listed here, let us know and we will
                                sort it so that everyone can know about it and leave a review.
                            </p>
                        </div>
                        <div className="col-md-8">
                            <img src="/assets/images/d4d78a_6f1e45c5b4b34df8a4d0299050cf3937_mv2.webp" 
                                style={{width: "100%"}}
                                alt="A map of welsh language usage decline"/>
                            {/* This image is going need to be an SVG */}
                        </div>
                    </div>

                </div>
            </PageContainer>
        );
    }
}

export default About;