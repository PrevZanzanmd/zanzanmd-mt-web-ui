import { Assign } from './reducerUtilityFunction'
import { SIDEMENU_COMPLETE } from '../Actions'


const globalDataStructure = {
	sideMenu: []
}

export const GlobalReducer = (state = globalDataStructure, action) => {
	switch(action.type){
		case SIDEMENU_COMPLETE:
			return Assign(state, { sideMenu: action.data })
		default:
			return state
	}
}