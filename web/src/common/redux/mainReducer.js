import { combineReducers } from 'redux';

import {
    messages,
    users,
    token,
    account,
    register,
    login,
} from './reducers';

const reducerMap = {
    messages,
    users,
    token,
    account,
    register,
    login,
}

export default combineReducers(reducerMap);