import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import SendNickName from './sendNickName';
import ChatWindow from './talk/chatWindow';



interface WebChatProps {
    socket: Socket
}


const WebChat: React.FC<WebChatProps> = (props) => {
    const {
        socket
    } = props;
    const [step, setStep] = useState(1);
    const handleStep = () => {
        if (step + 1 <= 1) setStep(step + 1);
    }
    
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
        }}
            onClick={handleStep}
        >
            {
                step === 0 &&
                <SendNickName />

            }
            {
                step === 1 &&
                <ChatWindow socket={socket} />
            }
        </article >
    );
}

export default WebChat;