import { BaseAction, actionIds } from '../types';

export const toggleThemeAction = (): BaseAction => ({
  type: actionIds.TOGGLE_THEME,
  payload: {},
});
