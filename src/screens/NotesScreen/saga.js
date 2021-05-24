import {put, takeLatest, call} from 'redux-saga/effects';
import {addNoteApi, getNotesApi} from './api';
import {
  GET_NOTES_ACTION,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  GET_NOTES_LOADING,
  ADD_NOTE_ACTION,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  ADD_NOTE_LOADING,
  ADD_PENDING_NOTE,
  CLEAR_ERROR,
} from './types';
import {delay, isConnected, UUID} from '../../lib/helper';
// import {submitChecksheetsSaga} from '../NewCheckSheet/saga';
// import {submitIncidentSaga} from '../ReportSubmission/saga';

function* getNotesSaga() {
  let connected = yield call(isConnected);
  if (connected) {
    try {
      yield put({type: GET_NOTES_LOADING, payload: true});
      let res = yield call(getNotesApi);
      if (res.status === 200) {
        yield put({type: GET_NOTES_SUCCESS, payload: res.result});
      } else {
        yield put({type: GET_NOTES_ERROR, payload: res.message});
      }
    } catch (error) {
      yield put({type: GET_NOTES_ERROR, payload: error.toString()});
    }
  }
  yield put({type: CLEAR_ERROR});
}

function* addNoteSaga(data) {
  let connected = yield call(isConnected);
  if (connected) {
    try {
      yield put({type: ADD_NOTE_LOADING, payload: true});
      let res = yield call(addNoteApi, data.payload);
      console.log(res);
      if (res.status === 200) {
        yield put({type: ADD_NOTE_SUCCESS, payload: res.message});
      } else {
        yield put({type: ADD_NOTE_ERROR, payload: res.message});
      }
    } catch (error) {
      yield put({type: ADD_NOTE_ERROR, payload: error.toString()});
    }
  } else {
    data.payload['_id'] = UUID();
    yield put({type: ADD_PENDING_NOTE, payload: data.payload});
    yield put({type: ADD_NOTE_SUCCESS, payload: 'Note added successfully'});
  }
  yield call(delay);
  yield put({type: CLEAR_ERROR});
}

function* watchNotesSaga() {
  yield takeLatest(GET_NOTES_ACTION, getNotesSaga);
  yield takeLatest(ADD_NOTE_ACTION, addNoteSaga);
}
export default watchNotesSaga;
