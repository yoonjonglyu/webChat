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
                    <span> (650)</span>
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
        </div>
    )
}

export default ChatHead;