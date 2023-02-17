import { legacy_createStore as createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
var data = {
    currentUser: {},
    currentOrder: {},
    currentServiceOrder:{}
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
        case "INIT_CURRENT_ORDER":
            for (const key in action.order) {
                newState.currentOrder[key] = action.order[key];
            }
            return newState;
        case "INIT_CURRENT_SERVICE_ORDER":
            for (const key in action.serviceOrder) {
                newState.currentServiceOrder[key] = action.serviceOrder[key];
            }
            return newState;
        default:
            return newState;

    }
}

export default createStore(reducer,applyMiddleware(thunk))