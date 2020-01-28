const sql_register = "SELECT registrator.register($1, $2, $3, $4)";
const sql_login = "SELECT registrator.login($1, $2)"
const sql_salt = "SELECT registrator.salt_by_login($1)";

module.exports.sql_register = sql_register;
module.exports.sql_login = sql_login;
module.exports.sql_salt = sql_salt;