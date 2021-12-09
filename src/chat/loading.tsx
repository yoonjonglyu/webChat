import React from 'react';

interface LoadingProps {
    state: number
}

const Loading: React.FC<LoadingProps> = ({ state }) => {
    const message = [
        "연결중입니다.",
        "채팅 서버 상태를 확인해주세요."
    ];

    return (
        <div>
            {message[state]}
        </div>
    );
}

export default Loading;