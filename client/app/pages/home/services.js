import React from "react";
import Col from "../../resusable-components/services-col";
import { strHash } from "../../core/hash";

const data = [
    {
        title: "Local Places",
        description: `This site is simply about getting people to use their Welsh. 
        It is all in English because it has been learners who have raised 
        the issue about where can they comfortably try out their Welsh 
        when out and about`,
        url: "assets/images/LocateIcon.svg",
        alt: "Locate Places Icon"
    },
    {
        title: "Native Speakers",
        description: `However, this is not just about learners.
        Those fluent need to also use their Welsh whenever they can.
        Welsh needs to be heard on the street, in the shops and wherever
        we get together`,
        url: "assets/images/CommentIcon.svg",
        alt: "Speaking Icon"
    },
    {
        title: "Days out",
        description: `So, before you shop, go on a day out, or whatever you like to do,
        see if there will be a Welsh language welcome and, above all,
        use your Welsh yourself!`,
        url: "assets/images/SuitcaseIcon.svg",
        alt: "Days out Icon"
    }
];

const services = data.map(service => (<Col key={strHash(service.title)} {...service} />));

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

                        {services}

                    </div>
                </div>
            </section>
        );
    }
}

export default ServicesSection;