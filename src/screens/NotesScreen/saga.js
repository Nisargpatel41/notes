import {put, takeLatest, call} from 'redux-saga/effects';
import {getNotesApi} from './api';
import {delay} from '../../lib/helper';
import {
  GET_NOTES_ACTION,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  GET_NOTES_LOADING,
} from './types';
import {isConnected} from '../../lib/helper';
// import {submitChecksheetsSaga} from '../NewCheckSheet/saga';
// import {submitIncidentSaga} from '../ReportSubmission/saga';

function* getNotesSaga() {
  let connected = yield call(isConnected);
  if (connected) {
    try {
      yield put({type: GET_NOTES_LOADING, payload: true});
      let res = yield call(getNotesApi);
      if (res.status === 200) {
        yield put({type: GET_NOTES_SUCCESS, payload: res});
      } else {
        yield put({type: GET_NOTES_ERROR, payload: res});
      }
    } catch (error) {
      yield put({type: GET_NOTES_ERROR, payload: error.toString()});
    }
  }
}

function* watchNotesSaga() {
  yield takeLatest(GET_NOTES_ACTION, getNotesSaga);
  //   yield takeLatest(CALL_PENDING_SUBMIT, callPendingSubmitSaga);
}
export default watchNotesSaga;
