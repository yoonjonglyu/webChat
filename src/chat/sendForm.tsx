import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

interface SendFormProps {
    socket: Socket
}

const SendForm: React.FC<SendFormProps> = (props) => {
    const {
        socket
    } = props;
    const [message, setMessage] = useState('');

    const sendMessage = (e: any) => {
        e.preventDefault();
        if (message.length > 0) {
            socket.emit('send', message);
            setMessage('');
        }
    }
    const handleMsg = (e: any) => {
        setMessage(e.target.value);
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

export default SendForm;