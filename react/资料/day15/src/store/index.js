import { legacy_createStore as createStore } from 'redux'

var data = {
    currentUser: {},
    currentStep: 0,
    newCoach:{}
}

function reducer(state = data, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "INIT_CURRENT_USER":
            for (const key in action.user) {
                newState.currentUser[key] = action.user[key];
            }
            return newState;
        case "CLEAR_CURRENT_USER":
            newState.currentUser = {};
            return newState;
        case "PREV_STEP":
            newState.currentStep = newState.currentStep - 1;
            return newState;
        case "NEXT_STEP":
            newState.currentStep = newState.currentStep + 1;
            return newState;
        case "SET_CURRENT":
            newState.currentStep=action.step;
            return newState;
        case "INIT_COACH":
            // newState.newCoach=action.coach;
            for (const key in action.coach) {
                newState.newCoach[key]=action.coach[key]
            }
            return newState;
        default:
            return newState;

    }
}

export default createStore(reducer)