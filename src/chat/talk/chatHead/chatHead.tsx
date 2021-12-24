import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import ChatEvents from '../../lib/chatEvents';

interface ChatHeadProps {
    room: string
    socket: Socket
}

const ChatHead: React.FC<ChatHeadProps> = (props) => {
    const {
        room,
        socket
    } = props;
    const [headCount, setHeadCount] = useState(0);
    useEffect(() => {
        const Events = new ChatEvents(socket);
        Events.getHeadCount(room, setHeadCount);
        return () => Events.clearHeadCount();
    });

    return (
        <div
            data-testid="chat-head"
            style={{
                display: "flex",
                height: "48px",
                background: "rgb(230, 221, 196)"
            }}
        >
            <nav
                style={{
                    display: "flex",
                    flex: "1"
                }}
            >
                <h2
                    style={{
                        margin: "12px",
                        fontSize: "1rem",
                        color: "rgb(103, 137, 131)"
                    }}
                >
                    {room}
                    <span
                        style={{
                            color: "rgb(57, 80, 76)"
                        }}
                    >
                        ({headCount})
                    </span>
                </h2>
            </nav>
            <button
                type="button"
                title="방에서 나가기"
                style={{
                    background: "none",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#464545",
                }}
            >
                X
            </button>
        </div >
    )
}

export default ChatHead;