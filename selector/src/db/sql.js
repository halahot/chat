export const sql_send_message = "SELECT taskworker.send_message($1, $2, $3)";
export const sql_get_messages = "SELECT u.login, m.* FROM teskworker.message m JOIN registrator.users u ON u.id = m.to_id WHERE (SELECT id FROM registrator.users WHERE token = $1 LIMIT 1) = m.sender_id"