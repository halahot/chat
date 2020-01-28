export const sql_send_message = "SELECT taskworker.send_message($1, $2, $3)";
export const sql_add_friend = "SELECT taskworker.add_friend($1, $2)";
export const sql_delete_friend = "SELECT taskworker.delete_friend($1, $2)";