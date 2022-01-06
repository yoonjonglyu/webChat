import React, { useContext } from 'react';
import { Socket } from 'socket.io-client';

import ChatEvents from './lib/chatEvents';
import { ConfigContext } from './store/configContext';

interface RoomListProps {
    rooms: Array<any>
    socket: Socket
}

const RoomList: React.FC<RoomListProps> = ({ rooms, socket }) => {
    const { handleRoom } = useContext(ConfigContext);
    const Events = new ChatEvents(socket);
    
    const joinRoom = (room: string) => {
        Events.joinRoom(room);
        handleRoom(room);
    }

    return (
        <article
            data-testid="room-list"
            style={{
                position: "absolute",
                display: "flex",
                flex: "1",
                flexFlow: "column",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                background: "#fff",
            }}
        >
            <h2>참여 가능한 채팅방 목록</h2>
            <ul data-testid="rooms">
                {
                    rooms.map((room, idx) =>
                        <li
                            key={idx}
                            onClick={() => joinRoom(room)}
                        >
                            {room}
                        </li>)
                }
            </ul>
        </article>
    );
}

export default RoomList;