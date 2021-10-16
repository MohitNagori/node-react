import { BaseAction, actionIds } from '../types';

export const gameStartAction = (): BaseAction => ({
  type: actionIds.START_GAME,
  payload: { word: '' },
});

export const gameStartedAction = (word: string): BaseAction => ({
  type: actionIds.START_GAME_SUCCESS,
  payload: { word },
});

export const letterPressedAction = (letter: string): BaseAction => ({
  type: actionIds.LETTER_PRESSED,
  payload: { letter },
});

export const timerRestart = (): BaseAction => ({
  type: actionIds.TIMER_RESTART,
  payload: { },
});

export const timerUpdated = (timeLeft: number): BaseAction => ({
  type: actionIds.TIMER_UPDATED,
  payload: { timer: timeLeft },
});
