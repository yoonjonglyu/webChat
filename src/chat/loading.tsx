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
        <div
            style={{
                display: "flex",
                flex: "1",
                flexFlow: "column",
                justifyContent: "center",
                background: "#eeebeb"
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "0.9rem",
                    fontWeight: "normal",
                    color: "tomato"
                }}
            >
                {message[state]}
            </h2>
        </div>
    );
}

export default Loading;