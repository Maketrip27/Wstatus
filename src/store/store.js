import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import {logger} from 'redux-logger';
import rootReducer from '../reducer/rootReducer'

const middleware = [
  thunkMiddleware
];

const enhancers = [applyMiddleware(...middleware)];

const store = createStore(rootReducer, undefined, compose(...enhancers));

const configureStore = () => {
    return {store};
}
export default configureStore;