const pgpromise = require('pg-promise');

const pgp = pgpromise();

const master = pgp({
    user: 'taskworker',
    password: 'taskworker',
    host: 'postgres-master',
    port: 5432,
    database: 'chat',
});

module.exports.master = master;