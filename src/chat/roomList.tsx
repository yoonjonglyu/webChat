import React, { useContext, useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

import ChatEvents from './lib/chatEvents';
import { StoreContext } from './store/configureStore';

interface RoomListProps {
    rooms: Array<string>
    socket: Socket
}

const RoomList: React.FC<RoomListProps> = ({ rooms, socket }) => {
    const [headCount, setHeadCount] = useState<{ [key: string]: Array<string> }>({});
    const { handleRoom, handleStep } = useContext(StoreContext);
    const Events = new ChatEvents(socket);

    useEffect(() => {
        Events.receiveRoomHeadCount(setHeadCount);
        const healthCheck = setInterval(() => Events.getHeadCount(), 1000);

        return () => {
            clearInterval(healthCheck);
            setHeadCount({});
        }
    }, []);

    const joinRoom = (room: string) => {
        Events.joinRoom(room);
        handleRoom(room);
        handleStep(5);
    }

    return (
        <article
            data-testid="room-list"
            style={{
                position: "absolute",
                display: "flex",
                flex: "1",
                flexFlow: "column nowrap",
                width: "100%",
                height: "100%",
                background: "rgb(255 92 3 / 50%)",
                overflow: "auto",
                textAlign: "center",
            }}
        >
            <h2>참여 가능한 채팅방 목록</h2>
            <ul
                data-testid="rooms"
                style={{
                    margin: "0",
                    padding: 0,
                    listStyle: "none",

                }}
            >
                {
                    rooms.map((room, idx) =>
                        <li
                            key={idx}
                            onClick={() => joinRoom(room)}
                            style={{
                                margin: "12px",
                                fontSize: "1.1rem",
                                color: "whitesmoke",
                            }}
                        >
                            {room} ({headCount[room]?.length || 0})
                        </li>)
                }
            </ul>
        </article>
    );
}

export default RoomList;