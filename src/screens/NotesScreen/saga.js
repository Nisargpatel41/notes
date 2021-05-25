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
  CALL_PENDING_SUBMITS_ACTION,
  CALL_PENDING_SUBMITS_ERROR,
  CALL_PENDING_SUBMITS_LOADING,
  CALL_PENDING_SUBMITS_SUCCESS,
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

function* callPendingSubmitsSaga(data) {
  let {pendingAddNotes} = data.payload;
  let connected = yield call(isConnected);
  if (connected) {
    try {
      yield put({type: CALL_PENDING_SUBMITS_LOADING, payload: true});
      if (pendingAddNotes && pendingAddNotes.length > 0) {
        for (const note of pendingAddNotes) {
          delete note['_id'];
          yield call(addNoteSaga, {payload: note});
        }
      }
      yield put({
        type: CALL_PENDING_SUBMITS_SUCCESS,
        payload: 'Notes Sync Successfully',
      });
    } catch (error) {
      yield put({type: CALL_PENDING_SUBMITS_ERROR, payload: error.toString()});
    }
  }
  yield put({type: CLEAR_ERROR});
}

function* watchNotesSaga() {
  yield takeLatest(GET_NOTES_ACTION, getNotesSaga);
  yield takeLatest(ADD_NOTE_ACTION, addNoteSaga);
  yield takeLatest(CALL_PENDING_SUBMITS_ACTION, callPendingSubmitsSaga);
}
export default watchNotesSaga;
