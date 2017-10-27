import { getSideMenu } from './sideMenuHandler'
import FetchSaga from './fetchSaga'
import SA_Saga from './shopAccountSaga'

export default [
	getSideMenu,
	FetchSaga,
	SA_Saga
]