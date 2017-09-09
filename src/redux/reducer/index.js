import { combineReducers } from 'redux'
import { GlobalReducer } from './globalReducers'
import FetchReducer from './fetchReducers'

export default combineReducers({
	globaldata: GlobalReducer,
	fetchdata: FetchReducer
})