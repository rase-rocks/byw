import React from "react";
import PropTypes from "prop-types";

import k from "../../core/text/supported-keys";

export function getText(t) {
    return {
        title:          t[k.aboutTitle],        sub1: t[k.aboutSub1],   sub2: t[k.aboutSub2],
        p1:             t[k.aboutP1],           p2a: t[k.aboutP2a],     openSource: t[k.aboutOpenSource],
        p2b:            t[k.aboutP2b],          p3: t[k.aboutP3],       p4: t[k.aboutP4],
        contributing:   t[k.aboutContributing], p5: t[k.aboutP5],       p6: t[k.aboutP6],
        p7a:            t[k.aboutP7a],          p7b: t[k.aboutP7b],     p7c: t[k.aboutP7c],
        p8:             t[k.aboutP8],           p9: t[k.aboutP9]
    };
}

class About extends React.Component {

    render() {

        const { text } = this.props;

        const {
            title,          sub1,   sub2,
            p1,             p2a,    openSource,
            p2b,            p3,     p4,
            contributing,   p5,     p6,
            p7a,            p7b,    p7c,
            p8,             p9
        } = getText(text);

        return (
            <section className="about">
                <div className="container">
                    <header>
                        <h2>
                            <small>{title}</small>
                            {sub1} <span className="text-primary">byw.cymru</span> {sub2}
                        </h2>
                    </header>
                    <div style={{ height: "40px" }}></div>
                    <div className="row">

                        <div className="col-md-6">
                            <p>{p1}.</p>
                            <p>
                                {p2a}
                                &nbsp;
                                <a href="https://en.wikipedia.org/wiki/Open-source_model"
                                    target="_blank"
                                    rel="noopener noreferrer">{openSource}</a>
                                &nbsp;
                                {p2b}
                                &nbsp;
                                <a href="https://github.com/rase-rocks/byw"
                                    target="_blank"
                                    rel="noopener noreferrer">GitHub</a>
                                &nbsp;
                            </p>
                        </div>

                        <div className="col-md-6">
                            <p>{p3}.</p>
                            <p>{p4}.</p>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h2>
                                <small>{title}</small>
                                {contributing}
                            </h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p>{p5}.</p>
                            <p>{p6}.</p>
                            <p>
                                {p7a}
                                &nbsp;
                                <a href="https://github.com/rase-rocks/byw/issues"
                                    target="_blank"
                                    rel="noopener noreferrer">{p7b}</a>
                                &nbsp;
                                {p7c}
                                &nbsp;
                                GitHub.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                {p8}
                                &nbsp;
                                <a href="https://github.com/rase-rocks/byw"
                                    target="_blank"
                                    rel="noopener noreferrer">GitHub.</a>
                                &nbsp;
                            </p>
                            <p>{p9}.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

About.propTypes = {
    text: PropTypes.object.isRequired
};

export default About;