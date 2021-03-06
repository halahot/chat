const nats = require('nats').connect('mynats:4222');
const hemeraJoi = require('hemera-joi');
const HEMERA = require('nats-hemera');

const {
    master,
} = require('./db/myDB');

const {
    sql_send_message,
    sql_add_friend,
    sql_delete_friend,
} = require('./db/sql');


const hemera = new HEMERA(nats, {
    logLevel: 'fatal',
});

hemera.use(hemeraJoi);

async function start(){

    await hemera.ready();

    const Joi = hemera.joi;



    hemera.add({
        topic: 'taskworker',
        cmd: "save_message",
        token: Joi.string().required(),
        login: Joi.string().required(),
        message: Joi.string().required(),
    },
    async (req) =>{
        try{
            let res = await master.none(sql_send_message, [req.token, req.login, req.message]);
            return {
                ok: true,
                data: res,
            }
        }
        catch(e){
            return {
                ok: false,
                data: e,
            }
        }
    });

    hemera.add({
        topic: 'taskworker',
        cmd: "add_friend",
        token: Joi.string().required(),
        login: Joi.string().required(),
    },
    async (req) =>{
        try{
            let res = await master.one(sql_add_friend, [req.token, req.login]);
            return {
                ok: true,
                data: res,
            }
        }
        catch(e){
            return {
                ok: false,
                data: e,
            }
        }
    });

    hemera.add({
        topic: 'taskworker',
        cmd: "delete_friend",
        token: Joi.string().required(),
        login: Joi.string().required(),
    },
    async (req) =>{
        try{
            let res = await master.one(sql_delete_friend, [req.token, req.login]);
            return {
                ok: true,
                data: res,
            }
        }
        catch(e){
            return {
                ok: false,
                data: e,
            }
        }
    });
}

(async () =>{
    console.log("Taskworker is running");
    await start();
})();