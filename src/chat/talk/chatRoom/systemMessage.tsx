import React from 'react';

interface SystemMessageProps {
    message: string
}

const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => {
    const messageStyle: React.CSSProperties = {
        maxWidth: "100%",
        padding: "8px",
        margin: "6px",
        fontSize: "0.9rem",
        color: "rgb(98 14 14)",
        wordBreak: "break-word",
        background: "rgb(0 0 0 / 19%)",
        borderRadius: "6px",
        textAlign: "center",
    };
    const boxStyle: React.CSSProperties = {
        display: "flex",
        flex: "1",
        flexFlow: "column",
        width: "100%",
        margin: 0,
    };

    return (
        <p style={boxStyle}>
            <span
                data-testid="system"
                style={messageStyle}
            >
                {message}
            </span>
        </p>
    );
};

export default SystemMessage;