const pgpromise = require('pg-promise');

const pgp = pgpromise();

const master = pgp({
    user: 'registrator',
    password: 'registrator',
    database: 'chat',
    port: 5432,
    host: 'postgres-master',
});

module.exports.master = master;