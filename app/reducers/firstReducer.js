import {ADD_CONTENT} from '../actions/FirstActions';

var intialState = {
    content: {}
}

function addContent(state, action) {
    return alterState(state, {
        content: action.content
    });
}

function alterState(state, alteredValues) {
    return Object.assign({}, state, alteredValues);
}
 
export default function sitterReducer(state = intialState, action) {
    switch(action.type) {
        case ADD_CONTENT:
            return addContent(state, action);
        default:
            return state
    }
}