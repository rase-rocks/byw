import React from "react";
import FetchableSectionBackground from "../../resusable-components/FetchableSectionBackground";
import colors from "../../core/colors";
import HeroSearchBar from "./hero-search-bar";

class HomeHero extends React.Component {
    render() {
        return (
            <FetchableSectionBackground backgroundColor={colors.mountainGreen}
                url="assets/images/leo-sammarco-37818-unsplash.jpg"
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
                    
                    <HeroSearchBar/>
                </div>
            </FetchableSectionBackground>
        );
    }
}

export default HomeHero;