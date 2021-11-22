import React from 'react';
import { io } from 'socket.io-client';

interface WebChatProps {

}

const WebChat: React.FC<WebChatProps> = () => {
    const socket = io('http://localhost:7778/webChat', {
        transports: ['websocket']
    });

    socket.on('connect', async () => {
        if (socket.connected) {
            socket.emit('init', socket.id);

            socket.on('room', async (rooms) => {
            });
            socket.on('receive', (msg) => {
                console.log(msg);
            });
        }
    });
    socket.on('disconnect', () => {

    });

    const joinChatRoom = (roomIdx: string) => {
        socket.emit('join', roomIdx);
    }
    const sendMessage = (msg: string) => {
        socket.emit('send', msg);
    }

    return (
        <article>
            <div className="chat-room">

            </div>
            <form className="chat-form">
                <input type="text" className="chat-input" />
                <button type="button" className="chat-request" onClick={() => sendMessage('test')}>전송</button>
            </form>
            채팅창 구현하기
        </article>
    );
}

export default WebChat;