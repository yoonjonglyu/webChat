import React from 'react';

interface ChatMessageProps {
    messages: Array<{
        idx: string
        message: string
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
                    const Style: React.CSSProperties = {
                        maxWidth: "58%",
                        padding: "8px",
                        margin: "8px",
                        fontSize: "1rem",
                        color: "#1b1b1b",
                        wordBreak: "break-word",
                        background: "rgb(0 0 0 / 19%)",
                        borderRadius: "6px",
                    };
                    if (current.idx === '#system') {
                        Style.maxWidth = "100%";
                        Style.textAlign = "center";
                        Style.color = "rgb(98 14 14)";
                        Style.fontSize = "0.9rem";
                        Style.margin = "6px";
                    }
                    if (current.idx === userId) {
                        Style.background = "tomato";
                        Style.marginLeft = "auto";
                    }
                    else if (current.idx !== '#system') {
                        Style.background = "#eeeeee";
                        Style.marginRight = "auto";
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
                            <p style={Style}>
                                {current.message}
                            </p>
                        </article>
                    );
                })
            }
        </>
    );
}

export default ChatMessage;