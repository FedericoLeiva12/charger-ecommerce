import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Provider from './provider';
import thunk from 'redux-thunk';

export const store = createStore(Provider, composeWithDevTools(applyMiddleware(thunk)));