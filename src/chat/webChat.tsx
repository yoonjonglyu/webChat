import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import Loading from './loading';
import SendNickName from './sendNickName';
import ChatWindow from './talk/chatWindow';

interface WebChatProps {
    socket: Socket
}


const WebChat: React.FC<WebChatProps> = (props) => {
    const {
        socket
    } = props;
    const [step, setStep] = useState(0);
    const handleStep = () => {
        setStep(2);
    }

    useEffect(() => {
        socket.on('connect', async () => {
            if (socket.connected) {
                socket.emit('join', {
                    socketIdx: socket.id,
                    room: '#1'
                });
                handleStep();
            }
        });
        socket.on('disconnect', () => {
        });
        socket.on('connect_error', () => {
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
        }}
            onClick={handleStep}
        >
            {
                step === 0 &&
                <Loading state={0} />
            }
            {
                step === 1 &&
                <SendNickName />

            }
            {
                step === 2 &&
                <ChatWindow socket={socket} />
            }
        </article >
    );
}

export default WebChat;