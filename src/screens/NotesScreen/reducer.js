import {
  GET_NOTES_LOADING,
  GET_NOTES_ERROR,
  GET_NOTES_SUCCESS,
  ADD_PENDING_NOTE,
  UPDATE_PENDING_NOTE,
  CLEAR_ERROR,
} from './types';

import createReducer from '../../lib/createReducer';

let initialState = {
  error: '',
  notes: [],
  pendingNotes: [],
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
      notes: [...state.pendingNotes, ...action.payload.result],
      error: '',
      loading: false,
    });
  },
  [GET_NOTES_ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.payload.message,
      loading: false,
    });
  },

  // PENDING
  [ADD_PENDING_NOTE](state, action) {
    //   let payloadKey = Object.keys(action.payload)[0];
    //   let payloadValue = Object.values(action.payload)[0];
    //   let updatedPending = arrayIfKeySame(
    //     state.pendingSubmits,
    //     payloadKey,
    //     payloadValue,
    //   );
    return Object.assign({}, state, {
      pendingNotes: action.payload,
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
      pendingNotes: action.payload,
    });
  },

  [CLEAR_ERROR](state, action) {
    return Object.assign({}, state, {
      error: '',
      loading: false,
      success: '',
    });
  },
});
