import React from "react";

import Form from "./form";
import LocatorMap from "./locator-map";
//import LocatorSearchBar from "./locator-search-bar";
import PageHeader from "../../resusable-components/page-header";
import SubmitHeading from "./submit-heading";

class Submit extends React.Component {
    render() {
        return (

            <div className="submit-container">

                <div className="container">
                    <PageHeader>
                        Submit to our index
                    </PageHeader>

                    <div className="row submit-main-content">

                        <div className="col-md-6">

                            <LocatorMap />
                            {/* <LocatorSearchBar /> */}

                        </div>

                        <div className="col-md-6">

                            <Form />

                        </div>
                    </div>

                    <SubmitHeading title="How to" />

                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                Submitting to the index is easy and anonymous.
                            </p>
                            <p>
                                You can search for a place in the box under the map and then use the
                                map to precisely locate the place you are submitting. Just drag the
                                pin onto the premises. The postcode is automatically filled in for
                                you, if there is one, so you can just add the name and street.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                Add the name and street information as you would like them to appear in
                                the index. If the location is already in the index then your
                                categorisation will be taken into account.
                            </p>
                            <p>
                                The use the slider to indicate how likely it is, based on your experience and knowledge
                                of the premises, that a person will hear and be able to use Welsh at the place.
                            </p>
                        </div>
                    </div>

                    <SubmitHeading title="If the index appears inaccurate" />

                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                The category (how likely it is to use Welsh) of a premises is calculated by
                                aggregating all the reviews received. So your submission will be taken into
                                account straight away, but it may or may not affect the current rating.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                If you feel the rating of a premises is way off and remains way off after you have
                                submitted your rating, then please get in touch. If you are the business owner
                                we can help by pointing you in the direction of resources to help increase the use
                                of Welsh in your business. If the data in the index is just plain wrong then we can
                                correct it.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default Submit;

