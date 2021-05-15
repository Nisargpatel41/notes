import createReducer from '../lib/createReducer';
import { THEME_ADD } from '../lib/types';
import theme from '../theme';
let initialState = {
  theme: theme,
};

export const styleReducer = createReducer(initialState, {
  [THEME_ADD](state) {
    return Object.assign({}, state, {
      theme: theme,
    });
  },
});
