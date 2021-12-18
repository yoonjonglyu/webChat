import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import WebChat from './webChat';

interface TomatoProps {
    url: string
}

const Tomato: React.FC<TomatoProps> = (props) => {
    const {
        url
    } = props;
    const [socket, setSocket] = useState<Socket>(io);
    useEffect(() => {
        setSocket(
            io(url,
                {
                    transports: ['websocket']

                }
            )
        );
    }, []);

    return (
        <WebChat socket={socket} />
    );
}

export default Tomato;