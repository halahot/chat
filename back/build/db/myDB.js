"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pgpromise = require('pg-promise');
const pgp = pgpromise();
exports.master = pgp({
    user: 'taskworker',
    password: 'taskworker',
    host: 'postgres-master',
    port: 5432,
    database: 'chat',
});
//# sourceMappingURL=myDB.js.map