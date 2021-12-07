import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import ChatWindow from './talk/chatWindow';

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
            <ChatWindow socket={socket} />
        </article >
    );
}

export default WebChat;