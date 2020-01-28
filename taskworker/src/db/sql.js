const sql_send_message = "SELECT taskworker.send_message($1, $2, $3)";
const sql_add_friend = "SELECT taskworker.add_friend($1, $2)";
const sql_delete_friend = "SELECT taskworker.delete_friend($1, $2)";

module.exports.sql_send_message = sql_send_message;
module.exports.sql_add_friend = sql_add_friend;
module.exports.sql_delete_friend = sql_delete_friend;
