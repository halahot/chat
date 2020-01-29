import * as types from './types';




export function start_get_messages(){
    return {
        type: types.START_GET_MESSAGES,
    }
}

export function succes_get_messages(messages){
    return {
        type: types.SUCCESS_GET_MESSAGES,
        payload: messages,
    }
}




export function start_get_users(){
    return {
        type: types.START_GET_USERS,
    }
}

export function succes_get_users(users){
    return {
        type: types.SUCCESS_GET_USERS,
        payload: users,
    }
}



export function start_get_account(){
    return {
        type: types.START_GET_ACCOUNT,
    }
}

export function succes_get_account(account){
    return {
        type: types.SUCCESS_GET_ACCOUNT,
        payload: account,
    }
}




export function start_token_check(){
    return {
        type: types.START_TOKEN_CHECK,
    }
}

export function success_token_check(token){
    return {
        type: types.SUCCESS_TOKEN_CHECK,
        payload: token,
    }
}

export function failed_token_check(){
    return {
        type: types.FAILED_TOKEN_CHECK,
    }
}



export function start_add_user(){
    return {
        type: types.START_ADD_USER,
    }
}

export function success_add_user(){
    return {
        type: types.SUCCESS_ADD_USER,
    }
}



export function start_delete_user(){
    return {
        type: types.START_DELETE_USER,
    }
}

export function success_delete_user(){
    return {
        type: types.SUCCESS_DELETE_USER,
    }
}



export function start_send_message(){
    return {
        type: types.START_SEND_MESSAGE
    }
}

export function success_send_message(){
    return {
        type: types.SUCCESS_SEND_MESSAGE,
    }
}


export function success_registration(){
    return {
        type: types.SUCCESS_REGISTER,
    }
}

export function failed_registration(){
    return {
        type: types.FAILED_REGISTER,
    }
}


export function failed_login(){
    return {
        type: types.FAILED_LOGIN,
    }
}