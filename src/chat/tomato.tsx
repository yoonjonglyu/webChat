import React from 'react';
import { io } from 'socket.io-client';

import WebChat from './webChat';

interface TomatoProps {
    url: string
}

const Tomato: React.FC<TomatoProps> = (props) => {
    const {
        url
    } = props;
    const Socket = io(url, {
        transports: ['websocket']
    });

    return (
        <WebChat socket={Socket} />
    );
}

export default Tomato;