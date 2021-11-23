import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

interface ChatRoomProps {
    socket: Socket
}

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
    const {
        socket
    } = props;
    const [chatLog, setChatLog] = useState<Array<any>>([]);
    socket.on('receive', (msg: any) => {
        const state = Array.from(chatLog);
        state.push(msg);
        setChatLog(state);
    });

    return (
        <div className="chat-room">
            {chatLog.map((msg: any, idx: any) => <p key={idx}>{msg}</p>)}
        </div>
    );
}

export default ChatRoom;