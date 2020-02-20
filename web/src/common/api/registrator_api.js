import * as actions from '../redux/actions';


const axios = require("axios");
const bcrypt = require("bcryptjs");

const ip = "registrator"

const Rport = 9025;
const adress = `http://${ip}:${Rport}`;


export function register(login, password, name){
  return dispatch => {
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
  
            if(res.data.data)
            {
              dispatch(actions.success_registration());
            }
            else{
              dispatch(actions.failed_registration());
            }
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
    
  }
  
export function login(login, password){
  return dispatch => {
    return new Promise( async(reslove, reject) =>{
      let salt = await axios.post(`${adress}/salt`, {
        log: login,
      });

      if(!salt.data.data){
        dispatch(actions.failed_login());
        reslove({ok: false, e: "Нет такого пользователя"});
      };

      bcrypt.hash(password, salt.data.data, async (err, hash) =>{
        let res = await axios.post(`${adress}/login`, {
          log: login,
          pas: hash,
        });
        if(res.data.data){
          dispatch(actions.success_token_check(res.data.data));
        }
        else{
          dispatch(actions.failed_login());
        }
        reslove(res.data);
      });
    })
  }
}