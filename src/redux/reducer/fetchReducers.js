import { Assign } from './reducerUtilityFunction'
import * as ACTION from '../Actions'


const fetchDataStructure = {
	shoplist: [],
	shopDetail: {},
	qrcodeUrl: '',
	shopPerm: [],
	industrydata: [],
	areadata: [],
	shopAccountdata: {},
	billlistdata: {transactionLists:[]},
	todaytotal: {},
	billDetail: {},
	allTotaldata: {},
	dayTotaldata: {},
	chartData: {coordinateList: []},
	cardlistdata: {list: []},
	shopBalance: {},
	withdrawlist: {list: []},
	bankCardlist: [],
	withdrawMsg: '',
	userinfodata: {},
	uploadData: {},
	downloaddata: {url: '', key: ''},
	forgetdata: {},
	cashierlist: [],
	cashierDetail: {},
	changeShopState: false,
	withdrawFee: 0
}

const FetchReducer = (state = fetchDataStructure, action) => {
	switch(action.type){
		case ACTION.GET_SHOP_LIST_SUCCESS: return Assign(state, { shoplist: action.data })
		case ACTION.GET_SHOP_DETAIL_SUCCESS: return Assign(state, { shopDetail: action.data })
		case ACTION.GET_PAYSRCRET_SUCCESS: return Assign(state, { qrcodeUrl: action.data })
		case ACTION.GET_SHOPPERM_SUCCESS: return Assign(state, { shopPerm: action.data })
		case ACTION.GET_INDUSTRY_SUCCESS: return Assign(state, { industrydata: action.data })
		case ACTION.GET_AREA_SUCCESS: return Assign(state, { areadata: action.data })
		case ACTION.GET_ACCOUNT_DETAIL_SUCCESS: return Assign(state, { shopAccountdata: action.data })
		case ACTION.GET_BILLLIST_SUCCESS: return Assign(state, { billlistdata: action.data })
		case ACTION.GET_TODAYTOTAL_SUCCESS: return Assign(state, { todaytotal: action.data })
		case ACTION.GET_BILLDETAIL_SUCCESS: return Assign(state, { billDetail: action.data })
		case ACTION.GET_ALLTOTAL_SUCCESS: return Assign(state, { allTotaldata: action.data })
		case ACTION.GET_CHARTDATA_SUCCESS: return Assign(state, { chartData: action.data })
		case ACTION.GET_DAYTOTAL_SUCCESS: return Assign(state, { dayTotaldata: action.data })
		case ACTION.GET_CARDLIST_SUCCESS: return Assign(state, { cardlistdata: action.data })
		case ACTION.GET_HOMEBALANCE_SUCCESS: return Assign(state, { shopBalance: action.data })
		case ACTION.GET_WITHDRAWLIST_SUCCESS: return Assign(state, { withdrawlist: action.data })
		case ACTION.BANKCARD_LIST_SUCCESS: return Assign(state, { bankCardlist: action.data })
		case ACTION.CAN_WITHDRAW_SUCCESS: return Assign(state, { withdrawMsg: action.data })
		case ACTION.GET_USERINFO_SUCCESS: return Assign(state, { userinfodata: action.data })
		case ACTION.GET_UPTOKEN_COMPLETE: return Assign(state, { uploadData: action.data })
		case ACTION.DOWNLOAD_COMPLETE: return Assign(state, { downloaddata: action.data })
		case ACTION.VALIDATEFORGETCOMPLETE: return Assign(state, { forgetdata: action.data })

		case ACTION.GET_CASHIERLIST_COMPLETE: return Assign(state, { cashierlist: action.data })
		case ACTION.GET_CASHIERDETAIL_COMPLETE: return Assign(state, { cashierDetail: action.data })

		case ACTION.GET_FEE_COMPLETE: return Assign(state, { withdrawFee: action.data })


		case ACTION.CHANGE_SHOP_COMPLETE: return Assign(state, { changeShopState: action.data })

		case ACTION.DOWN_LOADLIST_COMPLETE: return Assign(state, { shoplist: (_ => {
			let copyArr = state.shoplist.map(val => val)
			copyArr[Number(action.data.arrKey)].headPortrait = action.data.url
			return copyArr
		})()})

		case ACTION.RESET: return fetchDataStructure

		default: return state
	}
}

export default FetchReducer