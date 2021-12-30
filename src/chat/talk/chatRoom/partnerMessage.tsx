import React from 'react';

interface PartnerMessageProps {
    message: string
    openImageModal: Function
}

const PartnerMessage: React.FC<PartnerMessageProps> = ({ message, openImageModal }) => {
    const messageStyle: React.CSSProperties = {
        maxWidth: "58%",
        padding: "8px",
        margin: "8px",
        fontSize: "1rem",
        color: "#1b1b1b",
        wordBreak: "break-word",
        background: "#eeeeee",
        borderRadius: "6px",
    };

    return (
        <>
            {
                message.slice(0, 5) !== '@$IMG' ?
                    <span
                        data-testid="partner"
                        style={messageStyle}
                    >
                        {message}
                    </span > :
                    <img
                        data-testid="partner-image"
                        src={message.slice(5)}
                        style={messageStyle}
                        onClick={() => openImageModal(message.slice(5))}
                        alt="전송된 이미지"
                    />
            }
        </>
    );
};

export default PartnerMessage;