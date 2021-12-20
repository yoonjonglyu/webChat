import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

import SendPoto from './sendPoto';

interface SendFormProps {
    socket: Socket
}

const SendForm: React.FC<SendFormProps> = (props) => {
    const {
        socket
    } = props;
    const [message, setMessage] = useState('');

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.length > 0) {
            socket.emit('send', {
                socketIdx: socket.id,
                message: message,
                room: '#1'
            });
            setMessage('');
        }
    }
    const handleMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    return (
        <form
            data-testid="chat-form"
            onSubmit={sendMessage}
            style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "center",
                padding: "6px",
                background: "#DFD8CA",
            }}
        >
            <input
                type="text"
                data-testid="chat-input"
                value={message}
                onChange={handleMsg}
                style={{
                    flex: "3 0px",
                    margin: "3px 3px 0 0"
                }}
            />
            <SendPoto socket={socket} />
        </form>
    );
}

export default SendForm;