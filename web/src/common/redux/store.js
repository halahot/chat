import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from 'redux-logger';
import rootReducer from './mainReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore( initialState ) {

    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            createLogger(),
        ),        
    ));
}