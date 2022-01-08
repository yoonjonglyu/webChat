import React, { useEffect, useState, useContext } from 'react';
import { Socket } from 'socket.io-client';

import Loading from './loading';
import SendNickName from './sendNickName';
import RoomList from './roomList';
import ChatWindow from './talk/chatWindow';
import Modal from './modal';

import ChatEvents from './lib/chatEvents';
import { ConfigContext } from './store/configContext';
import { ModalContext } from './store/modalContext';

interface WebChatProps {
    socket: Socket
    config?: ConfigProps
}
interface ConfigProps {
    imageSize?: number
}


const WebChat: React.FC<WebChatProps> = (props) => {
    const {
        socket,
        config
    } = props;
    const { isModal } = useContext(ModalContext);
    const { handleRoom, handleImageSize, step, handleStep } = useContext(ConfigContext);
    useEffect(() => {
        if (config?.imageSize) {
            handleImageSize(config.imageSize);
        }
    }, []);

    const Events = new ChatEvents(socket);
    const [rooms, setRooms] = useState<Array<string>>([]);
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
            if (rooms.length === 1) {
                Events.joinRoom(rooms[0]);
                handleRoom(rooms[0]);
                handleStep(5);
            } else {
                handleStep(3);
            }
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
                <RoomList
                    rooms={rooms}
                    socket={socket}
                />
            }
            {
                step === 4 &&
                <SendNickName />
            }
            {
                step > 4 &&
                <ChatWindow socket={socket} />
            }
        </article >
    );
}

export default WebChat;