import React, { useState, useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

import WebChat from './webChat';

import RootContextProvider from './store';

interface TomatoProps {
    url: string
    imageSize?: number
}

const Tomato: React.FC<TomatoProps> = (props) => {
    const {
        url,
        imageSize
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
                <RootContextProvider>
                    <WebChat
                        socket={socket}
                        config={{
                            imageSize
                        }}
                    />
                </RootContextProvider>
            }
        </>
    );
}

export default Tomato;