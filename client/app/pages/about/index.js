import React from "react";

class About extends React.Component {
    render() {
        return (
            <section className="about">
                <div className="container">
                    <header>
                        <h2>
                            <small>About</small>
                            What can <span className="text-primary">BreatheYourWelsh</span> do?
                        </h2>
                    </header>
                    <div style={{height: "40px"}}></div>
                    <div className="row">

                        <div className="col-md-6">
                            <p>
                                BreatheYourWelsh is a community driven, crowd sourced, Welsh language resource.
                                Its primary aim is to help learners and others who are interested in the language
                                find places where they can hear and use the language.
                            </p>
                            <p>
                                The whole project is<a href="https://en.wikipedia.org/wiki/Open-source_model"
                                    target="_blank"
                                    rel="noopener noreferrer">&nbsp;open source&nbsp;
                                </a>and all decisions are made in the open on the projects repo, hosted on&nbsp;
                                <a href="https://github.com/rase-rocks/byw"
                                    target="_blank"
                                    rel="noopener noreferrer">&nbsp;GitHub&nbsp;
                                </a>
                            </p>
                        </div>

                        <div className="col-md-6">
                            <p>
                                The aim of the project is to make finding out this information as easy as
                                possible, with the maximum of community involvement. Therefore the design
                                of the website is to be as easy and quick to use as possible. It is focussed
                                around the map page which is the primary resource for searching the index.
                            </p>
                            <p>
                                All the code that makes up the website is available in the projects repo
                                and is viewable by anybody. The website and data is hosted using community
                                donated resources. The Api provides access to the data to anybody who wants
                                it. Over time it is expected that the number of Api endpoints will be increased
                                to make it more useful to developers and researchers.
                            </p>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h2>
                                Contributing
                            </h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                The quickest and easiest way to contribute to the project is to submit a review.
                                This just means adding a new place to the index or updating an existing
                                one if necessary.
                            </p>
                            <p>
                                Anybody can do this and no login or account is necessary.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                Those who wish to be more involved should check out the project repo,
                                which is hosted on<a href="https://github.com/rase-rocks/byw"
                                    target="_blank"
                                    rel="noopener noreferrer">&nbsp;GitHub.&nbsp;
                                </a>
                            </p>
                            <p>
                                There is plenty of work to do to make this project a useful tool for Welsh
                                learners.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;