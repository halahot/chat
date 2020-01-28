const sql_register = "SELECT registrator.register($1, $2, $3, $4)";
const sql_login = "SELECT registrator.login($1, $2)"

module.exports.sql_register = sql_register;
module.exports.sql_login = sql_login;