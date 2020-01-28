const nats = require('nats').connect('mynats:4222');
const hemeraJoi = require('hemera-joi');
const HEMERA = require('nats-hemera');

const {
    slave,
} = require('./db/myDB');

const {
    sql_get_messages,
    sql_get_users,
} = require('./db/sql');


const hemera = new HEMERA(nats, {
    logLevel: 'info',
});

hemera.use(hemeraJoi);

async function start(){

    await hemera.ready();

    const Joi = hemera.Joi;

    hemera.add({
        topic: 'selector',
        cmd: "get_messages",
        token: Joi.string().required(),
    },
    async (req) =>{
        try{
            let res = await slave.manyOrNone(sql_get_messages, [req.token]);
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
        topic: 'selector',
        cmd: "get_users",
        token: Joi.string().required(),
    },
    async (req) =>{
        try{
            let res = await slave.manyOrNone(sql_get_users, [req.token]);
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
        topic: 'selector',
        cmd: "check_token",
        token: Joi.string().required(),
    },
    async (req) =>{
        try{
            let res = await slave.one(sql_check_token, [req.token]);
            return {
                ok: true,
                data: res.check_token,
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
    console.log("Selector started");
    await start();
})()