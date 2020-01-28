const io = require("socket.io-client");
const axios = require("axios");
const bcrypt = require("bcryptjs");

const Sport = 9099;
const Sip = "localhost"
let socket = io.connect(`http://${Sip}:${Sport}?type=user&login=yaniddze&token=b48719e9b10cbfee89d84c48df8e83a4`);


const Rport = 9025;
const Rip = "localhost";
const adress = `http://${Rip}:${Rport}`;


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

function send_message(message, to){
  socket.emit('message', {
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

function get_account(){
  socket.emit('get_account');
}

function check_token(){
  socket.emit('check_token');
}

function add_friend(login){
  socket.emit('add_friend', {login});
}

function delete_friend(login){
  socket.emit('delete_friend', {login});
}

function register(login, password, name){
  return new Promise((resolve, reject) =>{
    bcrypt.genSalt(10,(err, salt) =>{
      bcrypt.hash(password, salt, async (err, hash) =>{
        try{
          let res = await axios.post(`${adress}/register`, {
            log: login,
            pas: hash,
            sal: salt,
            nam: name,
          });

          resolve(res.data);
        }
        catch(e){
          resolve({
            ok:false,
            data:e,
          })
        }
      })
    })
  })
}

async function login(login, password){
  return new Promise( async(reslove, reject) =>{
    let salt = await axios.post(`${adress}/salt`, {
      log: login,
    });
  
    if(!salt.data.data){
      reslove({ok: false, e: "Нет такого пользователя"});
    }

    bcrypt.hash(password, salt.data.data, async (err, hash) =>{
      let res = await axios.post(`${adress}/login`, {
        log: login,
        pas: hash,
      });

      reslove(res.data);
    })
  })
}

(async () =>{
    let res = await get_account("123", "Arcusterr");
    console.log(res);
  }
)()