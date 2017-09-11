import { Assign } from './reducerUtilityFunction'
import * as ACTION from '../Actions'


const fetchDataStructure = {
	shoplist: [],
	shopDetail: {},
	qrcodeUrl: '',
	shopPerm: [],
	industrydata: [],
	areadata: []
}

const FetchReducer = (state = fetchDataStructure, action) => {
	switch(action.type){
		case ACTION.GET_SHOP_LIST_SUCCESS:
			return Assign(state, { shoplist: action.data })
		case ACTION.GET_SHOP_DETAIL_SUCCESS:
			return Assign(state, { shopDetail: action.data })
		case ACTION.GET_PAYSRCRET_SUCCESS:
			return Assign(state, { qrcodeUrl: action.data })
		case ACTION.GET_SHOPPERM_SUCCESS:
			return Assign(state, { shopPerm: action.data })
		case ACTION.GET_INDUSTRY_SUCCESS:
			return Assign(state, { industrydata: action.data })
		case ACTION.GET_AREA_SUCCESS:
			return Assign(state, { areadata: action.data })
		default:
			return state
	}
}

export default FetchReducer