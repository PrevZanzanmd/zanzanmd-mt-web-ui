import { Assign } from './reducerUtilityFunction'
import { SIDEMENU_COMPLETE, MODAL_STATE, START_LOADING, CLOSE_LOADING, SELECT_LOAD, SET_TIMESTATE, SET_TIMESTR } from '../Actions'


const globalDataStructure = {
	sideMenu: [],
	modalState: false,
	loading: false,
	selectload: false,
	timeBtnDisabled: false,
	timeStr: '获取验证码'
}

export const GlobalReducer = (state = globalDataStructure, action) => {
	switch(action.type){
		case SIDEMENU_COMPLETE: return Assign(state, { sideMenu: action.data })
		case MODAL_STATE: return Assign(state, { modalState: action.data })
		case START_LOADING: return Assign(state, { loading: true })
		case CLOSE_LOADING: return Assign(state, { loading: false })
		case SELECT_LOAD: return Assign(state, { selectload: action.data })
		case SET_TIMESTATE: return Assign(state, { timeBtnDisabled: action.data })
		case SET_TIMESTR: return Assign(state, { timeStr: action.data })
		default: return state
	}
}