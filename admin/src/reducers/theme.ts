import { Reducer } from 'redux';

export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = (theme: ThemeName) => ({
  type: CHANGE_THEME,
  payload: theme,
});

export type ThemeName = 'light' | 'dark';

type State = ThemeName;
type Action =
  | ReturnType<typeof changeTheme>
  | { type: 'OTHER_ACTION'; payload?: any };

const themeReducer: Reducer<State, Action> = (
  previousState = (localStorage.getItem('theme') as ThemeName) || 'light',
  action,
) => {
  if (action.type === CHANGE_THEME) {
    return action.payload;
  }
  return previousState;
};

export default themeReducer;
