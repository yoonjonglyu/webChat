import React from 'react';

interface UserrMessageProps {
    message: string
    openImageModal: Function
    time: string
}

const UserMessage: React.FC<UserrMessageProps> = ({ message, openImageModal, time }) => {
    const messageStyle: React.CSSProperties = {
        maxWidth: "58%",
        padding: "8px",
        margin: "8px",
        fontSize: "1rem",
        color: "#1b1b1b",
        wordBreak: "break-word",
        background: "tomato",
        borderRadius: "6px",
    };
    const boxStyle: React.CSSProperties = {
        display: "flex",
        flex: "1",
        flexFlow: "row-reverse",
        width: "100%",
        margin: 0,
        marginLeft: "auto"
    };

    return (
        <>
            <p style={boxStyle}>
                {
                    message.slice(0, 5) !== '@$IMG' ?
                        <span
                            data-testid="user"
                            style={messageStyle}
                        >
                            {message}
                        </span > :
                        <img
                            data-testid="user-image"
                            src={message.slice(5)}
                            style={messageStyle}
                            onClick={() => openImageModal(message.slice(5))}
                            alt="전송된 이미지"
                        />
                }
                <time
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginBottom: "8px",
                        fontSize: "0.7rem",
                    }}
                >
                    {time}
                </time>
            </p>
        </>
    );
};

export default UserMessage;