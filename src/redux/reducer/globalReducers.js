import { Assign } from './reducerUtilityFunction'
import { SIDEMENU_COMPLETE, MODAL_STATE, START_LOADING, CLOSE_LOADING } from '../Actions'


const globalDataStructure = {
	sideMenu: [],
	modalState: false,
	loading: false
}

export const GlobalReducer = (state = globalDataStructure, action) => {
	switch(action.type){
		case SIDEMENU_COMPLETE:
			return Assign(state, { sideMenu: action.data })
		case MODAL_STATE:
			return Assign(state, { modalState: action.data })
		case START_LOADING:
			return Assign(state, { loading: true })
		case CLOSE_LOADING:
			return Assign(state, { loading: false })
		default:
			return state
	}
}