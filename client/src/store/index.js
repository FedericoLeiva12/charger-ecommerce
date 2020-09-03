import { createStore, applyMiddleware } from 'redux';
import Provider from './provider';
import thunk from 'redux-thunk';

export const store = createStore(Provider, applyMiddleware(thunk));