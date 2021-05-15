import {combineReducers} from 'redux';

import * as styleReducer from './styleReducer';
// import * as dashboardReducer from '../screens/Dashboard/reducer';
// import * as activationReducer from '../screens/ActivationScreen/reducer';
// import * as getChecksheetReducer from '../screens/NewCheckSheet/reducer';
// import * as submitIncidentReducer from '../screens/ReportSubmission/reducer';

export default combineReducers(Object.assign(styleReducer));
