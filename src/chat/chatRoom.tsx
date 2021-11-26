import React, { useRef } from 'react';
import { Socket } from 'socket.io-client';

interface ChatRoomProps {
    socket: Socket
}

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
    const {
        socket
    } = props;
    const room = useRef(null);
    socket.on('receive', (msg: any) => {
        const MessageNode = document.createElement('p');
        MessageNode.innerText = msg;
        const root: any = room.current;
        root.appendChild(MessageNode);
        // 리덕스 사가 같은 비동기 작업을 대신 처리할 상태관리 로직이 필요하다.
    });

    return (
        <div
            className="chat-room"
            style={{
                display: "flex",
                flexFlow: "column nowrap",
                flex: "1 0px",
                border: "1px solid",
                overflow: "auto",
            }}
            ref={room}
        >
        </div>
    );
}

export default ChatRoom;