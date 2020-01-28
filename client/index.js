const io = require("socket.io-client");

const port = 9099;

let socket = io.connect(`http://localhost:${port}?type=user&login=123&token=321`);


// Получение сообщений
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

function send_message(from, message, to){
  socket.emit('message', {
    from,
    message,
    to,
  });
};

function get_messages(){
  socket.emit('get_messages');
};

function get_friends(){
  socket.emit('get_users');
};


function check_token(){
  socket.emit('check_token');
}

function add_friend(login){
  socket.emit('add_friend', {login});
}

function delete_friend(login){
  socket.emit('delete_friend', {login});
}

setTimeout(() => {get_friends()},1000);