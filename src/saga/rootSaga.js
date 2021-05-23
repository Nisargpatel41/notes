import {fork} from 'redux-saga/effects';

import watchNotesSaga from '../screens/NotesScreen/saga';
// import watchActivationSaga from '../screens/ActivationScreen/saga';
// import {watchGetChecksheetAsync} from '../screens/NewCheckSheet/saga';
// import {watchSubmitIncidentAsync} from '../screens/ReportSubmission/saga';

export function* rootSaga() {
  yield fork(watchNotesSaga);
  // yield fork(watchActivationSaga);
  // yield fork(watchGetChecksheetAsync);
  // yield fork(watchSubmitIncidentAsync);
}
