export interface ChatMessage {
    from: string;
    message: string;
    to: string;
}

export interface MessageToHelp {
    from: string;
    message: string;
    name: string;
}

export interface User{
    type: string;
    socketId: string;
}