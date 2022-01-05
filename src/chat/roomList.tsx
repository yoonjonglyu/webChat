import React from 'react';

interface RoomListProps {
    rooms: Array<any>
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
    return (
        <article data-testid="room-list">
            참여 가능한 채팅방 목록
            <ul data-testid="rooms">
                {
                    rooms.map((room, idx) =>
                        <li key={idx}>
                            {room}
                        </li>)
                }
            </ul>
        </article>
    );
}

export default RoomList;