import { types } from "../actions";

import { defaultState, submissionStates } from "../../model/submission";

const submissionReducer = function (state = defaultState, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

        case types.addSubmission: {

            const submission = action.payload;
            
            reducedState[submission.coordinateHash] = Object.assign(
                {},
                submission,
                { status: submissionStates.sending });
                
            break;
        }

        case types.updateSubmissionStatus: {

            const { submission, status } = action.payload;
            reducedState[submission.coordinateHash] = Object.assign(
                {},
                submission,
                { status });

            break;
        }

        default:
            break;

    }

    return reducedState;
};

export default submissionReducer;
export { submissionStates };