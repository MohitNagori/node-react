import { combineReducers } from 'redux';
import { apppReducer, appState } from './app';
import {
  gameState,
  gameReducer,
} from './game';

export interface State {
  game: gameState;
  app: appState
}

export const rootReducers = combineReducers<State>({
  game: gameReducer,
  app: apppReducer
});
