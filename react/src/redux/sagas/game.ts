import { call, put, takeEvery } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { generateWord } from '../../api';
import { CONSTANTS } from '../../utils/constants';
import { gameStartedAction, timerUpdated } from '../actions';

export function* requestNewGame() {
  const word = (yield call(generateWord)) as unknown as string;
  yield put(gameStartedAction(word));
}

// Timer
export function* startTimer() {
  const channel = yield call(countdown, CONSTANTS.TIMER);
  yield takeEvery(channel, function* (secs: number) {
    console.log(secs);
    yield put(timerUpdated(secs));
  });
  
}
function countdown(secs: number) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        secs -= 1
        if (secs >= 0) {
          emitter(secs)
        } else {
          // this causes the channel to close
          emitter(END)
        }
      }, 1000);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}