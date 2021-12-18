import React from 'react';

interface ChatMessageProps {
    messages: Array<{
        idx: string
        message: string
        time: string
    }>
    userId: string
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
    const {
        messages,
        userId
    } = props;

    return (
        <>
            {
                messages.map((current, idx) => {
                    const messageStyle: React.CSSProperties = {
                        maxWidth: "58%",
                        padding: "8px",
                        margin: "8px",
                        fontSize: "1rem",
                        color: "#1b1b1b",
                        wordBreak: "break-word",
                        background: "rgb(0 0 0 / 19%)",
                        borderRadius: "6px",
                    };
                    const boxStyle: React.CSSProperties = {
                        display: "flex",
                        flex: "1",
                        flexFlow: "column",
                        width: "100%",
                        margin: 0,
                    };
                    if (current.idx === '#system') {
                        messageStyle.maxWidth = "100%";
                        messageStyle.textAlign = "center";
                        messageStyle.color = "rgb(98 14 14)";
                        messageStyle.fontSize = "0.9rem";
                        messageStyle.margin = "6px";
                    }
                    if (current.idx === userId) {
                        messageStyle.background = "tomato";
                        boxStyle.marginLeft = "auto";
                        boxStyle.flexFlow ="row-reverse";
                    }
                    else if (current.idx !== '#system') {
                        messageStyle.background = "#eeeeee";
                        boxStyle.marginRight = "auto";
                        boxStyle.flexFlow ="row";
                    }

                    return (
                        <article
                            key={idx}
                            style={{
                                display: "flex",
                                flexFlow: "column",
                            }}
                        >
                            {
                                current.idx !== '#system' && current.idx !== userId &&
                                <span
                                    style={{
                                        paddingLeft: "8px",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    {current.idx}
                                </span>
                            }
                            <p style={boxStyle}>
                                <span style={messageStyle}>
                                    {current.message}
                                </span>
                                {
                                    current.idx !== '#system' &&
                                    <time
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-end",
                                            marginBottom: "8px",
                                            fontSize: "0.7rem",
                                        }}
                                    >{current.time}</time>
                                }
                            </p>

                        </article>
                    );
                })
            }
        </>
    );
}

export default ChatMessage;