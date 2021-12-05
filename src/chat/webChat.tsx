import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import SendForm from './sendForm';
import ChatRoom from './chatRoom';

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
            width: "80%",
            height: "auto",
            padding: "12px",
            background: "#678983",
            borderRadius: "12px"
        }}>
            <ChatRoom socket={socket} />
            <SendForm socket={socket} />
        </article >
    );
}

export default WebChat;