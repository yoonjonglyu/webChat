import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import SendForm from './talk/sendForm';
import ChatRoom from './talk/chatRoom';

interface WebChatProps {
    socket: Socket
}

const WebChat: React.FC<WebChatProps> = (props) => {
    const {
        socket
    } = props;

    useEffect(() => {
        socket.on('connect', async () => {
            if (socket.connected) socket.emit('init', socket.id);
        });
        socket.on('disconnect', () => {

        });
        return () => {
            socket.close();
        }
    }, []);

    return (
        <article style={{
            display: "flex",
            flexFlow: "column wrap",
            flex: "1",
            justifyContent: "center",
            border: "1px solid #678983",
        }}>
            <ChatRoom socket={socket} />
            <SendForm socket={socket} />
        </article >
    );
}

export default WebChat;