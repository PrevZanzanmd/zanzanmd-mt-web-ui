import { getSideMenu } from './sideMenuHandler'
import GlobalSaga from './globalSaga'
import FetchSaga from './fetchSaga'

export default [
	getSideMenu,
	GlobalSaga,
	FetchSaga
]