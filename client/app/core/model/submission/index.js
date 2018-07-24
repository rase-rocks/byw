const submissionStates = {
    sending: "sending",
    success: "success",
    failure: "failure"
};

const defaultState = {};

const hasSubmissions = function (state) {
    return state && Object.keys(state).length > 0;
};

const hasPending = function (state) {
    return Object.keys(state).reduce((acc, key) => {
        if (acc) return acc;
        return state[key].status === submissionStates.sending;
    }, false);
};

const submissionsFromState = function (state) {
    return Object.keys(state)
        .map(key => state[key]);
};

const matchesPreviousSubmission = function (coordinateHash, state) {
    return state[coordinateHash] !== undefined;
};

export {
    submissionStates,
    defaultState,
    hasSubmissions,
    hasPending,
    submissionsFromState,
    matchesPreviousSubmission
};