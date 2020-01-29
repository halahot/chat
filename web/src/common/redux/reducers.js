import * as types from './types';

export function messages(state = [], action){
    if(action.type === types.START_GET_MESSAGES){
        return state;
    }
    if(action.type === types.SUCCESS_GET_MESSAGES){
        return action.payload;
    }
    return state;
}


export function users(state = [], action){
    if(action.type === types.START_GET_USERS){
        return [];
    }
    if(action.type === types.SUCCESS_GET_USERS){
        return action.payload;
    }
    return state;
}


export function account(state = {}, action){
    if(action.type === types.START_GET_ACCOUNT){
        return [];
    }
    if(action.type === types.SUCCESS_GET_ACCOUNT){
        return action.payload;
    }
    return state;
}


export function token(state = '', action){
    if(action.type === types.SUCCESS_TOKEN_CHECK){
        // Cookies.set('token', action.payload);
        return action.payload;
    }
    if(action.type === types.FAILED_TOKEN_CHECK){
        // Cookies.set('token', '');
        return '';
    }
    return state;
}


export function register(state = {error: "", success: false}, action){
    if(action.type === types.SUCCESS_REGISTER){
        return {error: "", success: true,}
    }
    if(action.type === "REGISTRATOR_REMAKE"){
        return {error: "", success: false,}
    }
    if(action.type === types.FAILED_REGISTER){
        return {error: "Логин занят", success: false,}
    }
    return state;
}


export function login(state = {error: ""}, action){
    if(action.type === types.FAILED_LOGIN){
        return {error: "Нет такого пользователя"};
    }
    return state;
}