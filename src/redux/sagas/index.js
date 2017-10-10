import { getSideMenu } from './sideMenuHandler'
import GlobalSaga from './globalSaga'
import FetchSaga from './fetchSaga'
import SA_Saga from './shopAccountSaga'

export default [
	getSideMenu,
	GlobalSaga,
	FetchSaga,
	SA_Saga
]