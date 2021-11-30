import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

interface ChatRoomProps {
    socket: Socket
}

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
    const {
        socket
    } = props;
    const [chatLog, setChatLog] = useState<Array<any>>([]);
    const state = Array.from(chatLog);
    useEffect(() => { // 컴포넌트 리렌더링에 의한 리스닝 이벤트 중복 문제 해결
        socket.on('receive', (data: { idx: string, message: string }) => {
            if (socket.connected) {
                // 골때린다 컨텍스트가 갈리는건지 여기서는 chatLog가 갱신이 안된다.ㅋㅋ 비제어 방식
                state.push(data); 
                handleChatLog();
            }
        });
    }, []);
    const handleChatLog = () => {
        setChatLog([...state]);
    }

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
        >
            {
                chatLog.map((current, idx) => {
                    return (
                        <p
                            key={idx}
                            style={{
                                padding: "12px",
                                wordBreak: 'break-all',
                                background: current.idx === socket.id ? 'tomato' : '#ffffff',
                            }}
                        >
                            {current.message}
                        </p>
                    );
                })
            }
        </div>
    );
}

export default ChatRoom;