const nats = require('nats').connect('mynats:4222');
const hemeraJoi = require('hemera-joi');
const HEMERA = require('nats-hemera');

const {
    master,
    slave,
} = require('./db/myDB');

const {
    sql_get_messages,
    sql_send_message,
} = require('./db/sql');


const hemera = new HEMERA(nats, {
    logLevel: 'info',
});

hemera.use(hemeraJoi);

async function start(){

    await hemera.ready();

    const Joi = hemera.Joi;

    hemera.add({
        topic: 'taskworker',
        cmd: "get_messages",
        token: Joi.string().required(),
    },
    async (req) =>{
        try{
            let res = await master.manyOrNone(sql_get_messages, [req.token]);
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
    console.log("Taskworker started");
    await start();
})()