import { combineReducers } from 'redux';
import appReducer from './appReducer';

export type ReduxState = {
  appReducer: any,
};

const reducers = combineReducers({
  appReducer,
});

export default reducers;
