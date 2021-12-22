import React from 'react';
import { Socket } from 'socket.io-client';

import ChatRoom from './chatRoom/chatRoom';
import SendForm from './sendMessage/sendForm';
import ChatHead from './chatHead/chatHead';

interface ChatWindowProps {
    socket: Socket
}

const ChatWindow: React.FC<ChatWindowProps> = (props) => {
    const {
        socket
    } = props;

    return (
        <>
            <ChatHead
                room={"#1"}
                socket={socket}
            />
            <ChatRoom socket={socket} />
            <SendForm socket={socket} />
        </>
    );
}

export default ChatWindow;