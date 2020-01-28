const pgpromise = require('pg-promise');

const pgp = pgpromise();


const slave = pgp({
    user: 'selector',
    password: 'selector',
    host: 'postgres-slave',
    port: 5432,
    database: 'chat',
});

module.exports.slave = slave;