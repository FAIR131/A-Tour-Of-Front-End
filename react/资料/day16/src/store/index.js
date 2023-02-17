import { legacy_createStore as createStore } from 'redux'

var data = {
    currentUser: {}
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
        default:
            return newState;

    }
}

export default createStore(reducer)