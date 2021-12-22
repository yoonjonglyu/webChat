import React from 'react';
import { Socket } from 'socket.io-client';

interface ChatHeadProps {
    room: string
    socket: Socket
}

const ChatHead: React.FC<ChatHeadProps> = (props) => {
    const {
        room,
        socket
    } = props;

    return (
        <div
            data-testId="chat-head"
            style={{
                height: "40px"
            }}
        >
            {room}
            <button type="button">나가기</button>
        </div>
    )
}

export default ChatHead;