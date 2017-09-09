import { Assign } from './reducerUtilityFunction'
import * as ACTION from '../Actions'


const fetchDataStructure = {
	shoplist: [],
	shopDetail: {},
	qrcodeUrl: ''
}

const FetchReducer = (state = fetchDataStructure, action) => {
	switch(action.type){
		case ACTION.GET_SHOP_LIST_SUCCESS:
			return Assign(state, { shoplist: action.data })
		case ACTION.GET_SHOP_DETAIL_SUCCESS:
			return Assign(state, { shopDetail: action.data })
		case ACTION.GET_PAYSRCRET_SUCCESS:
			return Assign(state, { qrcodeUrl: action.data })
		default:
			return state
	}
}

export default FetchReducer