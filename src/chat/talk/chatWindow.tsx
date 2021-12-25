import React, { useContext } from 'react';
import { Socket } from 'socket.io-client';

import ChatRoom from './chatRoom/chatRoom';
import SendForm from './sendMessage/sendForm';
import ChatHead from './chatHead/chatHead';
import Modal from './modal';

import { ModalContext } from '../store/modalContext';

interface ChatWindowProps {
    socket: Socket
}

const ChatWindow: React.FC<ChatWindowProps> = (props) => {
    const {
        socket
    } = props;
    const { isModal } = useContext(ModalContext);

    return (
        <>
            {
                isModal &&
                <Modal />
            }
            <ChatHead socket={socket} />
            <ChatRoom socket={socket} />
            <SendForm socket={socket} />
        </>
    );
}

export default ChatWindow;