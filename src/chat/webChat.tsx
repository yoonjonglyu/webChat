import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

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
    const Send = (props: any) => {
        const {
            socket
        } = props;
        const [message, setMessage] = useState('');

        const sendMessage = (e: any) => {
            e.preventDefault();
            if (message.length > 0) {
                socket.emit('send', message);
            }
        }
        const handleMsg = (e: any) => {
            setMessage(e.target.value);
            e.target.value = '';
        }

        return (
            <form className="chat-form" onSubmit={sendMessage}>
                <input
                    type="text"
                    className="chat-input"
                    value={message}
                    onChange={handleMsg}
                />
                <button type="button" className="chat-request" onClick={sendMessage}>전송</button>
            </form>
        );
    }

    return (
        <article>
            <Log socket={socket} />
            <Send socket={socket} />
            채팅창 구현하기
        </article >
    );
}

export default WebChat;