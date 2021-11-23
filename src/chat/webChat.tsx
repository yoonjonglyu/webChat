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
        if (socket.connected) {
            socket.emit('init', socket.id);
            socket.on('room', (rooms: any) => {

            });
        }
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
        <article>
            <ChatRoom socket={socket} />
            <SendForm socket={socket} />
            채팅창 구현하기
        </article >
    );
}

export default WebChat;