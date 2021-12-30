import React from 'react';

interface SystemMessageProps {
    message: string
}

const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => {
    return (
        <span
            data-testid="system"
            style={{
                maxWidth: "100%",
                padding: "8px",
                margin: "6px",
                fontSize: "0.9rem",
                color: "rgb(98 14 14)",
                wordBreak: "break-word",
                background: "rgb(0 0 0 / 19%)",
                borderRadius: "6px",
                textAlign: "center",
            }}
        >
            {message}
        </span>
    );
};

export default SystemMessage;