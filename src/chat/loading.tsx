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
                flexFlow: "column",
                justifyContent: "center",
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgb(60, 60, 60, 50%)",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "0.9rem",
                    fontWeight: "normal",
                    color: "tomato",
                    textShadow: "0.5px 0.5px #88473b",
                }}
            >
                {message[state]}
            </h2>
        </div>
    );
}

export default Loading;