import React, { useEffect, useState, useContext } from 'react';
import { Socket } from 'socket.io-client';

import Loading from './loading';
import SendNickName from './sendNickName';
import ChatWindow from './talk/chatWindow';
import Modal from './modal';

import ChatEvents from './lib/chatEvents';
import { RoomContext } from './store/roomContext';
import { ModalContext } from './store/modalContext';

interface WebChatProps {
    socket: Socket
}


const WebChat: React.FC<WebChatProps> = (props) => {
    const {
        socket
    } = props;
    const { isModal } = useContext(ModalContext);
    const [step, setStep] = useState(0);
    const [rooms, setRooms] = useState<Array<string>>([]);
    const { handleRoom } = useContext(RoomContext);
    const Events = new ChatEvents(socket);
    const handleStep = (step: number) => {
        setStep(step);
    }

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
            handleRoom(rooms[0]);
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
                isModal &&
                <Modal />
            }
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