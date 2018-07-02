import React from "react";
import FetchableSectionBackground from "../../resusable-components/FetchableSectionBackground";
import colors from "../../core/colors";

class HomeHero extends React.Component {
    render() {
        return (
            <FetchableSectionBackground backgroundColor={colors.mountainGreen}
                url="/assets/images/leo-sammarco-37818-unsplash.jpg"
                classes="hero d-flex align-items-center">
                <div className="container">

                    <p className="small-text-hero">
                        <i className="icon-localizer text-primary mr-1"></i>
                        Crowd sourced
                        <span className="text-primary">&nbsp;Welsh&nbsp;</span>
                        language resource
                    </p>

                    <h1>
                        Let&apos;s
                        <span className="text-primary">
                            &nbsp;find&nbsp;
                        </span>
                        somewhere
                    </h1>
                    <p className="text-hero">Find out where to use and hear the language</p>
                    <div className="search-bar">
                        <form action="#">
                            <div className="row">
                                <div className="form-group col-lg-4">
                                    <input type="search" name="search" placeholder="What are you searching for?" />
                                </div>
                                <div className="form-group col-lg-5">
                                    <input type="text" name="location" placeholder="Location" id="location" />
                                    <label htmlFor="location" className="location"><i className="fa fa-dot-circle-o"></i></label>
                                </div>
                                <div className="form-group col-lg-2 text-center">
                                    <input type="submit" value="Search" className="submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </FetchableSectionBackground>
        );
    }
}

export default HomeHero;