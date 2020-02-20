const fastify = require('fastify')({
    logger: false,
});
const cors = require('fastify-cors');

const { 
    master,
} = require('./db/myDB');

const {
    sql_login,
    sql_register,
    sql_salt,
} = require('./db/sql');

fastify.register(cors(), {
    origin: /w+/,
});



fastify.route({
    method: "GET",
    url: "/test",
    handler: async (req, reply) =>{
        reply.send({data: 123})
    }
});

fastify.route({
    method: "POST",
    url: "/register",
    handler: async (req, reply) =>{
        let login = req.body.log;
        let password = req.body.pas;
        let salt = req.body.sal;
        let name = req.body.nam;

        reply.header("Access-Control-Allow-Origin", "*")

        try{
            let res = await master.one(sql_register, [login, password, salt, name]);
            reply.send({
                ok: true,
                data: res.register,
            });
        }
        catch(e){
            reply.send({
                ok: false,
                data: e,
            });
        }
        
    }
})

fastify.route({
    method: "POST",
    url: "/login",
    handler: async (req, reply) =>{
        let login = req.body.log;
        let password = req.body.pas;


        try{
            let res = await master.one(sql_login, [login, password]);
            reply.send({
                ok: true,
                data: res.login,
            });
        }
        catch(e){
            reply.send({
                ok: false,
                data: e,
            });
        }
        
    }
})

fastify.route({
    method: "POST",
    url: "/salt",
    handler: async (req, reply) =>{
        let login = req.body.log;


        try{
            let res = await master.one(sql_salt, [login]);
            reply.send({
                ok: true,
                data: res.salt_by_login,
            });
        }
        catch(e){
            reply.send({
                ok: false,
                data: e,
            });
        }
        
    }
})


const start = async () => {
    try {
        await fastify.listen(9098, '0.0.0.0', (err, adress) => {
            if(err){
                console.log(err);
                process.exit(1);
            }
            console.log(`Registrator is running on ${adress}`);
        });
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
  }
  start()

