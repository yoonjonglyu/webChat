import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import WebChat from './webChat';

import RoomContextProvider from './store/roomContext';
import ModalContextProvider from './store/modalContext';

interface TomatoProps {
    url: string
}

const Tomato: React.FC<TomatoProps> = (props) => {
    const {
        url
    } = props;
    const [socket, setSocket] = useState<Socket | null>(null);
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
        <>
            {
                socket !== null &&
                <ModalContextProvider>
                    <RoomContextProvider>
                        <WebChat socket={socket} />
                    </RoomContextProvider>
                </ModalContextProvider>
            }
        </>
    );
}

export default Tomato;