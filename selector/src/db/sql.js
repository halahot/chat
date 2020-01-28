const sql_check_token = "SELECT registrator.check_token($1)"
const sql_get_users = "SELECT u.login FROM registrator.users u JOIN taskworker.friend f ON f.friend_id = u.id WHERE (SELECT id FROM registrator.users WHERE token = $1) = f.user_id";
const sql_get_messages = "SELECT u.login, m.* FROM taskworker.message m JOIN registrator.users u ON u.id = m.to_id WHERE (SELECT id FROM registrator.users WHERE token = $1 LIMIT 1) = m.sender_id"
const sql_get_account = "SELECT u.id, u.login, u.full_name FROM users u WHERE token = $1"

module.exports.sql_check_token = sql_check_token;
module.exports.sql_get_users = sql_get_users;
module.exports.sql_get_messages = sql_get_messages;
module.exports.sql_get_account = sql_get_account;