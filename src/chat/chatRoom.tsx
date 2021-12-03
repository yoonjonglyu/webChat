import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

import  ChatMessage from './chatMessage';

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
        socket.on('joinRoom', (id: string) => {
            if (socket.connected) {
                state.push({
                    idx: '#system',
                    message: `${id} 님이 대화에 참여 하였습니다.`,
                });
                handleChatLog();
            }
        });
        socket.on('leaveRoom', (id: string) => {
            if (socket.connected) {
                state.push({
                    idx: '#system',
                    message: `${id} 님이 대화에서 나갔습니다.`,
                });
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
                border: "1px solid #181818",
                overflow: "auto",
            }}
        >
            <ChatMessage 
                messages={chatLog}
                userIdx={socket.id}
            />
        </div>
    );
}

export default ChatRoom;