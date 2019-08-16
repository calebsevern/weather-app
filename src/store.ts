import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';

const middleware = [reduxThunk];
const store = createStore(
  reducers,
  applyMiddleware(...middleware),
);

export default store;
