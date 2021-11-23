import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import SendForm from './sendForm';

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

    const Log = (props: any) => {
        const {
            socket
        } = props;
        const [chatLog, setChatLog] = useState<Array<any>>([]);
        socket.on('receive', (msg: any) => {
            const state = Array.from(chatLog);
            state.push(msg);
            setChatLog(state);
        });

        return (
            <div className="chat-room">
                {chatLog.map((msg: any, idx: any) => <p key={idx}>{msg}</p>)}
            </div>
        );
    }

    return (
        <article>
            <Log socket={socket} />
            <SendForm socket={socket} />
            채팅창 구현하기
        </article >
    );
}

export default WebChat;