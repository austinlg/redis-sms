import { combineReducers } from 'redux'
import firstReducer from './firstReducer'

const appReducer = combineReducers({
    firstReducer,
})

export default appReducer