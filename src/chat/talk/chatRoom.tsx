import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

import ChatMessage from './chatMessage';

interface ChatRoomProps {
    socket: Socket
}

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
    const {
        socket
    } = props;
    const [userId, setUserId] = useState('');
    const [chatLog, setChatLog] = useState<Array<{
        idx: string, message: string
    }>>([]);

    useEffect(() => {
        setUserId(socket.id);
    }, [chatLog]);

    useEffect(() => {
        const handleChatLog = (msg: { idx: string, message: string }) => {
            setChatLog([...chatLog, msg]);
        }
        socket.once('receive', (data: { idx: string, message: string }) => {
            if (socket.connected) {
                handleChatLog(data);
            }
        });
        socket.once('joinRoom', (id: string) => {
            if (socket.connected) {
                handleChatLog({
                    idx: '#system',
                    message: `${id} 님이 대화에 참여 하였습니다.`,
                });
            }
        });
        socket.once('leaveRoom', (id: string) => {
            if (socket.connected) {
                handleChatLog({
                    idx: '#system',
                    message: `${id} 님이 대화에서 나갔습니다.`,
                });
            }
        });
        return () => {
            socket.removeAllListeners('receive');
            socket.removeAllListeners('joinRoom');
            socket.removeAllListeners('leaveRoom');
        }
    });
    // 자기가 최신 메시지를 보낼때 자동 스크롤하기
    const Room: any = useRef(null);
    useEffect(() => {
        if (socket.id === chatLog[chatLog.length - 1]?.idx) {
            if (Room.current.scroll) {
                Room.current.scroll(0, Room.current.scrollHeight);
            }
        }
    }, [chatLog]);
    return (
        <div
            data-testid="chat-room"
            style={{
                display: "flex",
                flexFlow: "column nowrap",
                flex: "1 0px",
                background: "#E6DDC4",
                overflow: "auto",
            }}
            ref={Room}
        >
            <ChatMessage
                messages={chatLog}
                userId={userId}
            />
        </div>
    );
}

export default ChatRoom;