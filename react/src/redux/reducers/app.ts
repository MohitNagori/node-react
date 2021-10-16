import { BaseAction, actionIds } from '../types';

export interface appState {
  theme: string;
};

export const apppReducer = (
  state: appState = {
    theme: 'light',
  },
  action: BaseAction
) => {
  switch (action.type) {    
    case actionIds.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
       };
    default:
      return state;
  }
};
