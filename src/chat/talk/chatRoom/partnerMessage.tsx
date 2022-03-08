import React, { useState } from 'react';

interface PartnerMessageProps {
    idx: string
    message: string
    openImageModal: Function
    time: string
}

const PartnerMessage: React.FC<PartnerMessageProps> = (props) => {
    const {
        idx,
        message,
        openImageModal,
        time
    } = props;
    const [isHover, setIsHover] = useState(false);

    const downloadImage = (image: string) => {
        const imageLink = document.createElement("a");
        imageLink.href = image;
        imageLink.download = `이미지_${Date.now()}.png`;
        imageLink.click();
        imageLink.remove();
    }

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
    const boxStyle: React.CSSProperties = {
        position: "relative",
        display: "flex",
        flex: "1",
        flexFlow: "row",
        width: "100%",
        margin: 0,
        marginRight: "auto"
    };

    return (
        <>
            <span
                style={{
                    paddingLeft: "8px",
                    fontSize: "0.8rem",
                }}
            >
                {idx}
            </span>
            <p style={boxStyle}>
                {
                    message.slice(0, 5) !== '@$IMG' ?
                        <span
                            data-testid="partner"
                            style={messageStyle}
                        >
                            {message}
                        </span > :
                        <>
                        <img
                            data-testid="partner-image"
                            src={message.slice(5)}
                            style={messageStyle}
                            onClick={() => openImageModal(message.slice(5))}
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            alt="전송된 이미지"
                        />
                        {
                            isHover &&
                            <button
                                style={{
                                    position: "absolute",
                                    margin: "8px",
                                    padding: "3px",
                                    fontSize: "0.8rem",
                                    color: "#cecece",
                                    background: "rgb(255, 99, 71, 50%)",
                                    border: "none",
                                }}
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                onClick={() => downloadImage(message.slice(5))}
                            >
                                Download
                            </button>
                        }
                    </>
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

export default PartnerMessage;