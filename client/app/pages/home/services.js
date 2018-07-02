import React from "react";

class ServicesSection extends React.Component {
    render() {
        return (
            <section className="services">
                <div className="container text-center">
                    <header>
                        <h2><small>Our Services</small>
                        What does <span className="text-primary">BreatheYourWelsh</span> do for me?</h2>
                        <p className="lead col-md-10 mx-auto">
                        
                        </p>
                    </header>
                    <div className="row">
                        
                        <div className="item col-lg-4">
                            <div className="icon"><i className="fa fa-map-marker-alt"></i></div>
                            <div className="text">
                                <h3 className="h4">Local Places</h3>
                                <p className="text-muted">
                                    This site is simply about getting people to use their Welsh. 
                                    It is all in English because it has been learners who have raised 
                                    the issue about where can they comfortably try out their Welsh 
                                    when out and about.
                                </p>
                            </div>
                        </div>
                        
                        <div className="item col-lg-4">
                            <div className="icon"><i className="fa fa-comments"></i></div>
                            <div className="text">
                                <h3 className="h4">Native Speakers</h3>
                                <p className="text-muted">
                                    However, this is not just about learners. 
                                    Those fluent need to also use their Welsh whenever they can. 
                                    Welsh needs to be heard on the street, in the shops and wherever 
                                    we get together.
                                </p>
                            </div>
                        </div>
                        
                        <div className="item col-lg-4">
                            <div className="icon"><i className="fa fa-suitcase"></i></div>
                            <div className="text">
                                <h3 className="h4">Days out</h3>
                                <p className="text-muted">
                                    So, before you shop, go on a day out, or whatever you like to do, 
                                    see if there will be a Welsh language welcome and, above all, 
                                    use your Welsh yourself!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ServicesSection;