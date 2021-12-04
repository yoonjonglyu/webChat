import React from 'react';
import { io } from 'socket.io-client';

import WebChat from './webChat';

interface ChatConfigProps {
    url: string
}

const ChatConfig: (props: ChatConfigProps) => React.FC = (props) => {
    const {
        url
    } = props;

    const Socket = io(url, {
        transports: ['websocket']
    });

    return () => (<WebChat socket={Socket} />);
}

export default ChatConfig;