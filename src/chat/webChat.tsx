import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import Loading from './loading';
import SendNickName from './sendNickName';
import ChatWindow from './talk/chatWindow';

import ChatEvents from './lib/chatEvents';

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

    const [rooms, setRooms] = useState<Array<string>>([]);
    const Events = new ChatEvents(socket);
    useEffect(() => {
        Events.handleConnect(() => {
            Events.getRooms(setRooms);
        });
        Events.handleDisConnect(() => {
            handleStep(1);
        });
        Events.handleError(() => {
            handleStep(1);
        });
        return () => {
            socket.close();
        }
    }, [socket]);
    useEffect(() => {
        if (rooms.length > 0) {
            Events.joinRoom(rooms[0]);
            handleStep(2);
        }
    }, [rooms]);


    return (
        <article style={{
            display: "flex",
            flexFlow: "column wrap",
            flex: "1",
            justifyContent: "center",
            position: "relative",
            border: "1px solid #678983",
        }}
            onClick={() => handleStep(2)}
        >
            {
                step < 2 &&
                <Loading state={step} />
            }
            {
                step === 3 &&
                <SendNickName />
            }
            <ChatWindow socket={socket} />
        </article >
    );
}

export default WebChat;