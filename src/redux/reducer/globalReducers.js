import { Assign } from './reducerUtilityFunction'
import { SIDEMENU_COMPLETE, MODAL_STATE } from '../Actions'


const globalDataStructure = {
	sideMenu: [],
	modalState: false
}

export const GlobalReducer = (state = globalDataStructure, action) => {
	switch(action.type){
		case SIDEMENU_COMPLETE:
			return Assign(state, { sideMenu: action.data })
		case MODAL_STATE:
			return Assign(state, { modalState: action.data })
		default:
			return state
	}
}