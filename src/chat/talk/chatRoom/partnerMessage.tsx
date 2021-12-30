import React from 'react';

interface PartnerMessageProps {
    message: string
}

const PartnerMessage: React.FC<PartnerMessageProps> = ({ message }) => {
    return (
        <span
            data-testid="partner"
            style={{
                maxWidth: "58%",
                padding: "8px",
                margin: "8px",
                fontSize: "1rem",
                color: "#1b1b1b",
                wordBreak: "break-word",
                background: "#eeeeee",
                borderRadius: "6px",
            }}
        >
            {message}
        </span >
    );
};

export default PartnerMessage;