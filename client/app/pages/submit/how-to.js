import React from "react";
import SubmitHeading from "./submit-heading";

class HowTo extends React.Component {
    render() {
        return (
            <div>
                <SubmitHeading title="How to..." />

                <div className="row">
                    <div className="col-md-6">
                        <p>
                            ...find somewhere already listed:
                        </p>
                        <ol>
                            <li>
                                The premises you selected in the map page will appear
                                in the submit box ready for your review of Welsh speaking
                                likelyhood.
                            </li>
                            <li>
                                Choose what you feel is best and hit submit.
                            </li>
                            <li>
                                If the premises you selected is not where you want to submit a review
                                for then just drag the map pin, the form will be cleared, and you can
                                locate the premises you want to submit.
                            </li>
                        </ol>
                    </div>
                    <div className="col-md-6">
                        <p>...submit a new premises:</p>
                        <ol>
                            <li>
                                Drag the map pin to locate the place
                            </li>
                            <li>
                                The coordinates and postcode will be filled out. Just add the name of
                                the premises and the address as you would like it to appear in the
                                index.
                            </li>
                            <li>
                                Select how likely you feel a person is to hear and be able to use Welsh
                                in the premises. This isn&apos;t scientific, just what you think is
                                likely.
                            </li>
                        </ol>
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
        );
    }
}

export default HowTo;