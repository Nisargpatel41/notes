import {
  GET_NOTES_ACTION,
  ADD_NOTE_ACTION,
  UPDATE_NOTE_ACTION,
  CALL_PENDING_SUBMITS_ACTION,
  SET_PENDING_DATA,
  ARCHIVE_NOTE_ACTION,
  DELETE_NOTE_ACTION,
} from './types';

export const getNotesAction = () => ({
  type: GET_NOTES_ACTION,
});

export const addNoteAction = data => ({
  type: ADD_NOTE_ACTION,
  payload: data,
});

export const updateNoteAction = data => ({
  type: UPDATE_NOTE_ACTION,
  payload: data,
});

export const archiveNoteAction = data => ({
  type: ARCHIVE_NOTE_ACTION,
  payload: data,
});

export const deleteNoteAction = data => ({
  type: DELETE_NOTE_ACTION,
  payload: data,
});

export const callPendingSubmits = data => ({
  type: CALL_PENDING_SUBMITS_ACTION,
  payload: data,
});

export const setPendingDataAction = () => ({
  type: SET_PENDING_DATA,
});
