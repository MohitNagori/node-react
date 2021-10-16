import { CONSTANTS } from '../../utils/constants';
import { BaseAction, actionIds } from '../types';

export interface gameState {
  word: string;
  interaction: string;
  attempt: number;
  timer: number;
  progress: boolean;
};

export const gameReducer = (
  state: gameState = {
    word: '',
    interaction: '',
    attempt: 0,
    timer: 0,
    progress: false
  },
  action: BaseAction
) => {
  switch (action.type) {    
    case actionIds.START_GAME:
      return {
        ...state,
        word: '',
        interaction: '',
        attempt: 0,
        timer: 0,
        progress: false
      };
    case actionIds.START_GAME_SUCCESS:
      return {
        ...state,
        word: action.payload.word,
        interaction: '',
        attempt: CONSTANTS.MAX_ATTEMPTS,
        timer: CONSTANTS.TIMER,
        progress: true
      };
    case actionIds.LETTER_PRESSED:
      return {
        ...state,
        interaction: state.interaction + action.payload.letter,
        attempt: !state.word.includes(action.payload.letter) ? (state.attempt - 1) : state.attempt
      };
    case actionIds.TIMER_RESTART:
      return {
        ...state,
        timer: CONSTANTS.TIMER
      }
    case actionIds.TIMER_UPDATED:
      return {
        ...state,
        timer: action.payload.timer
      }
    
    default:
      return state;
  }
};
