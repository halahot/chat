const io = require("socket.io-client");

const ip = "84.201.157.99"
const Sport = 9099;


export function init(){
    let socket = io.connect(`http://${ip}:${Sport}?type=user&login=yaniddze&token=b48719e9b10cbfee89d84c48df8e83a4`);


    // Получение сообщения
    socket.on('message', (res) =>{
    console.log('message', res);
    })


    // Получение архива сообщений
    socket.on('messages', (res) =>{
    console.log("messages",res);
    });

    // Получение друзей
    socket.on('users', (res) =>{
    console.log("users", res);
    });

    // Получение ответа на проверку токена
    socket.on('token_check_result', (res) =>{
    console.log("token", res);
    });

    // Получение ответа на добавление друга
    socket.on('ok_add_friend', (res) => {
    console.log("ad", res);
    });

    // Получение ответа на удаление друга
    socket.on('ok_delete_friend', (res) => {
    console.log("del", res);
    });

    socket.on('account_info', (res) => {
    console.log(res);
    })
}

function send_message(message, to){
    socket.emit('message', {
      message,
      to,
    });
  };

export function get_messages(){
  socket.emit('get_messages');
};

export function get_friends(){
  socket.emit('get_users');
};

export function get_account(){
  socket.emit('get_account');
}

export function check_token(){
  socket.emit('check_token');
}

export function add_friend(login){
  socket.emit('add_friend', {login});
}

export function delete_friend(login){
  socket.emit('delete_friend', {login});
}