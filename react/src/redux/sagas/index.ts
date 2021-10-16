import { takeLatest } from 'redux-saga/effects';
import { actionIds } from '../types';
import { requestNewGame, startTimer } from './game';

export const rootSaga = function* root() {
  yield takeLatest(actionIds.START_GAME, requestNewGame);
  yield takeLatest(actionIds.TIMER_RESTART, startTimer);  
  // yield takeLatest(actionIds.LETTER_PRESSED, startTimer);
};
