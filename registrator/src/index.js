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
} = require('./db/sql');

fastify.register(cors);


fastify.route({
    method: "GET",
    url: "/test",
    handler: async (req, reply) =>{
        reply.send({data: 123})
    }
});


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

