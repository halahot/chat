export enum ChatEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    MESSAGE = 'message',
    HELPER_DISCONNECT = 'helper_disconnect',
    HELPER_CONNECT = 'helper_connect',
    USER_DISCONNECTED = 'user_disconnected',
    MESSAGE_TO_HELP = 'message_to_help',
    ADD_FRIEND = 'add_friend',
    DELETE_FRIEND = 'delete_friend',
    GET_MESSAGES = 'get_messages',
    GET_USERS = 'get_users',
}