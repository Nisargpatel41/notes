import {
  CLEAR_ERROR,
  GET_NOTES_LOADING,
  GET_NOTES_ERROR,
  GET_NOTES_SUCCESS,
  ADD_NOTE_ERROR,
  ADD_NOTE_LOADING,
  ADD_NOTE_SUCCESS,
  ADD_PENDING_NOTE,
  UPDATE_PENDING_NOTE,
} from './types';
import {arrayIfKeySame} from '../../lib/helper';

import createReducer from '../../lib/createReducer';

let initialState = {
  error: '',
  notes: [],
  pendingAddNotes: [],
  pendingUpdateNotes: [],
  pendingArchiveNotes: [],
  pendingDeleteNotes: [],
  syncCompleted: '',
  success: '',
  loading: false,
};

export const notesReducer = createReducer(initialState, {
  // NOTES
  [GET_NOTES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: action.payload,
    });
  },

  [GET_NOTES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      notes: [...state.pendingAddNotes, ...action.payload],
      error: '',
      loading: false,
    });
  },
  [GET_NOTES_ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.payload,
      loading: false,
    });
  },

  // ADD NOTE
  [ADD_NOTE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: action.payload,
    });
  },

  [ADD_NOTE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      success: action.payload,
      error: '',
      loading: false,
    });
  },

  [ADD_NOTE_ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.payload,
      loading: false,
      success: '',
    });
  },

  //ADD PENDING NOTE
  [ADD_PENDING_NOTE](state, action) {
    let tempArray = state.pendingAddNotes;
    tempArray.push(action.payload);

    let tempNotes = [...state.notes, ...tempArray];
    let updatedNotes = arrayIfKeySame(tempNotes, note => note._id);

    return Object.assign({}, state, {
      pendingAddNotes: tempArray,
      notes: updatedNotes,
    });
  },

  [UPDATE_PENDING_NOTE](state, action) {
    //   let updatedPending = state.pendingSubmits;
    //   let payloadKey = Object.keys(action.payload)[0];
    //   let payloadValue = Object.values(action.payload)[0];
    //   if (Object.keys(state.pendingSubmits).includes(payloadKey)) {
    //     updatedPending[payloadKey] = reducerDeleteAtIndex(
    //       state.pendingSubmits[payloadKey],
    //       payloadValue,
    //     );
    //   }
    return Object.assign({}, state, {
      pendingAddNotes: action.payload,
    });
  },

  [CLEAR_ERROR](state, action) {
    return Object.assign({}, state, {
      error: '',
      loading: false,
      success: '',
      syncCompleted: '',
    });
  },
});
