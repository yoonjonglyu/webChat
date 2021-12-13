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
    const handleStep = (step: number) => {
        setStep(step);
    }

    useEffect(() => {
        socket.on('connect', async () => {
            if (socket.connected) {
                socket.emit('join', {
                    socketIdx: socket.id,
                    room: '#1'
                });
                handleStep(2);
            }
        });
        socket.on('disconnect', () => {
            handleStep(1);
        });
        socket.on('connect_error', () => {
            handleStep(1);
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
            onClick={() => handleStep(2)}
        >
            {
                step === 0 &&
                <Loading state={0} />
            }
                        {
                step === 1 &&
                <Loading state={1} />
            }
            {
                step === 3 &&
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