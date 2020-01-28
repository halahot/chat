const axios = require("axios");
const bcrypt = require("bcryptjs");


const ip = "84.201.157.99"

const Rport = 9025;
const adress = `http://${ip}:${Rport}`;


export function register(login, password, name){
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
  
export async function login(login, password){
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