const pgpromise = require('pg-promise');

const pgp = pgpromise();

export const master = pgp({
    user: 'taskworker',
    password: 'taskworker',
    host: 'postgres-master',
    port: 5432,
    database: 'chat',
});


export const slave = pgp({
    user: 'selector',
    password: 'selector',
    host: 'postgres-slave',
    port: 5432,
    database: 'chat',
});