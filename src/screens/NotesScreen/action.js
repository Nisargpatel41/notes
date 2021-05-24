import {GET_NOTES_ACTION, ADD_NOTE_ACTION} from './types';

export const getNotesAction = () => ({
  type: GET_NOTES_ACTION,
});

export const addNoteAction = data => ({
  type: ADD_NOTE_ACTION,
  payload: data,
});
