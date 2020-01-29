import * as actions from '../redux/actions';


const io = require("socket.io-client");


const ip = "84.201.157.99"
const Sport = 9099;

let socket;

export function init(token, login){
  socket = io.connect(`http://${ip}:${Sport}?type=user&login=${login}&token=${token}`);
  return dispatch => {
    socket.on('message', (res) =>{
      dispatch(get_messages());
    })
  }
}


export function get_messages(){
  return dispatch => {
    if(socket){
      return new Promise((reslove, reject) =>{
      
        dispatch(actions.start_get_messages());
  
        socket.emit('get_messages');
  
  
        socket.on('messages', (res) =>{
          dispatch(actions.succes_get_messages(res.data));
          reslove(res);
        });
      })
    }
  }
};


export function get_friends(){
  return dispatch => {
    if(socket){
      return new Promise((reslove, reject) =>{
        
        dispatch(actions.start_get_users());

        socket.emit('get_users');


        socket.on('users', (res) =>{
          dispatch(actions.succes_get_users(res.data));
          reslove(res);
        });
      })
    }
    return;
  }
};

export function get_account(){
  
  return dispatch => {
    if(socket){
      return new Promise((reslove, reject) =>{
        
        dispatch(actions.start_get_account());

        socket.emit('get_account');


        socket.on('account_info', (res) =>{
          dispatch(actions.succes_get_account(res.data));
          reslove(res);
        });
      })
    }
  }
}

export function check_token(){
  return dispatch => {
    if(socket){
    return new Promise((reslove, reject) =>{
      
        dispatch(actions.start_token_check());

        socket.emit('check_token');

        socket.on('token_check_result', (res) =>{
          if(!res.ok || !res.data){
            dispatch(actions.failed_token_check());
          }else{
            dispatch(actions.success_token_check(res.data));
          }
          reslove(res);
        });
      });
    }
  }
}


export function add_friend(login){
  return dispatch => {
    if(socket){
      return new Promise((reslove, reject) =>{
        
        dispatch(actions.start_add_user());

        socket.emit('add_friend', {login});


        socket.on('ok_add_friend', (res) =>{
          dispatch(get_friends());
          dispatch(actions.success_add_user());
          reslove(res);
        });
      })
    }
  }
  
}

export function delete_friend(login){
  return dispatch => {
    if(socket){
      return new Promise((reslove, reject) =>{
        
        dispatch(actions.start_delete_user());

        socket.emit('delete_friend', {login});


        socket.on('ok_delete_friend', (res) =>{
          dispatch(get_friends());
          dispatch(actions.success_delete_user());
          reslove(res);
        });
      })
    }
  }
}


export function send_message(message, to){
  return dispatch => {
    if(socket){
      return new Promise((reslove, reject) =>{
        
        dispatch(actions.start_send_message());

        socket.emit('message', {
          message,
          to,
        });

        socket.on('sended_message', (res) =>{
          dispatch(get_messages());
          dispatch(actions.success_send_message());
          reslove(res);
        })  
      })
    }
  }
}