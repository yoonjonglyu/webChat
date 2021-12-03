import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import SendForm from './sendForm';
import ChatRoom from './chatRoom';

interface WebChatProps {

}

const WebChat: React.FC<WebChatProps> = () => {
    const socket = io('http://localhost:7778/webChat', {
        transports: ['websocket']
    });;

    socket.on('connect', async () => {
        if (socket.connected) socket.emit('init', socket.id);
    });
    socket.on('room', (rooms: any) => {

    });
    socket.on('disconnect', () => {

    });

    useEffect(() => {
        return () => {
            socket.close();
        }
    }, []);

    const joinChatRoom = (roomIdx: string) => {
        socket.emit('join', roomIdx);
    }

    return (
        <article style={{
            display: "flex",
            flexFlow: "column wrap",
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