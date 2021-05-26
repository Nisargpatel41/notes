import {
  CLEAR_ERROR,
  GET_NOTES_LOADING,
  GET_NOTES_ERROR,
  GET_NOTES_SUCCESS,
  ADD_NOTE_ERROR,
  ADD_NOTE_LOADING,
  ADD_NOTE_SUCCESS,
  ADD_PENDING_NOTE,
  UPDATE_NOTE_ERROR,
  UPDATE_NOTE_LOADING,
  UPDATE_NOTE_SUCCESS,
  UPDATE_PENDING_NOTE,
  ARCHIVE_NOTE_ERROR,
  ARCHIVE_NOTE_LOADING,
  ARCHIVE_NOTE_SUCCESS,
  ARCHIVE_PENDING_NOTE,
  DELETE_NOTE_ERROR,
  DELETE_NOTE_LOADING,
  DELETE_NOTE_SUCCESS,
  DELETE_PENDING_NOTE,
  CALL_PENDING_SUBMITS_ERROR,
  CALL_PENDING_SUBMITS_LOADING,
  CALL_PENDING_SUBMITS_SUCCESS,
  SET_PENDING_DATA,
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
  callPendingSubmitsSuccess: '',
  callPendingSubmitsError: '',
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
      notes: [
        ...state.pendingAddNotes,
        ...state.pendingUpdateNotes,
        ...action.payload,
      ],
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

  // UPDATE NOTE
  [UPDATE_NOTE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: action.payload,
    });
  },

  [UPDATE_NOTE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      success: action.payload,
      error: '',
      loading: false,
    });
  },

  [UPDATE_NOTE_ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.payload,
      loading: false,
      success: '',
    });
  },

  //UPDATE PENDING NOTE
  [UPDATE_PENDING_NOTE](state, action) {
    let tempArray = state.pendingUpdateNotes;
    tempArray.push(action.payload);

    let tempNotes = [...state.notes, ...tempArray];
    let updatedNotes = arrayIfKeySame(tempNotes, note => note._id);

    return Object.assign({}, state, {
      pendingUpdateNotes: tempArray,
      notes: updatedNotes,
    });
  },

  // ARCHIVE NOTE
  [ARCHIVE_NOTE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: action.payload,
    });
  },

  [ARCHIVE_NOTE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      success: action.payload,
      error: '',
      loading: false,
    });
  },

  [ARCHIVE_NOTE_ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.payload,
      loading: false,
      success: '',
    });
  },

  //ARCHIVE PENDING NOTE
  [ARCHIVE_PENDING_NOTE](state, action) {
    let tempArray = state.pendingArchiveNotes;
    tempArray.push(action.payload);

    let tempNotes = [...state.notes];
    let thisNoteIndex = tempNotes.findIndex(
      note => note._id === action.payload.noteId,
    );
    tempNotes.splice(thisNoteIndex, 1);
    return Object.assign({}, state, {
      pendingArchiveNotes: tempArray,
      notes: tempNotes,
    });
  },

  // DELETE NOTE
  [DELETE_NOTE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: action.payload,
    });
  },

  [DELETE_NOTE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      success: action.payload,
      error: '',
      loading: false,
    });
  },

  [DELETE_NOTE_ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.payload,
      loading: false,
      success: '',
    });
  },

  //DELETE PENDING NOTE
  [DELETE_PENDING_NOTE](state, action) {
    let tempArray = state.pendingDeleteNotes;
    tempArray.push(action.payload);

    let tempNotes = [...state.notes];
    let thisNoteIndex = tempNotes.findIndex(
      note => note._id === action.payload.noteId,
    );
    tempNotes.splice(thisNoteIndex, 1);

    return Object.assign({}, state, {
      pendingDeleteNotes: tempArray,
      notes: tempNotes,
    });
  },

  [CALL_PENDING_SUBMITS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      callPendingSubmitsError: '',
      loading: false,
      callPendingSubmitsSuccess: action.payload,
    });
  },
  [CALL_PENDING_SUBMITS_ERROR](state, action) {
    return Object.assign({}, state, {
      callPendingSubmitsError: action.payload,
      loading: false,
      callPendingSubmitsSuccess: '',
    });
  },
  [CALL_PENDING_SUBMITS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: action.payload,
    });
  },

  [SET_PENDING_DATA](state, action) {
    return Object.assign({}, state, {
      pendingAddNotes: [],
      pendingUpdateNotes: [],
      pendingArchiveNotes: [],
      pendingDeleteNotes: [],
    });
  },

  [CLEAR_ERROR](state, action) {
    return Object.assign({}, state, {
      error: '',
      loading: false,
      success: '',
      callPendingSubmitsSuccess: '',
      callPendingSubmitsError: '',
    });
  },
});
