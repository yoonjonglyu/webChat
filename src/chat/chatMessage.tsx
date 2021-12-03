import React from 'react';

interface ChatMessageProps {
    messages: Array<{
        idx: string
        message: string
    }>
    userIdx: string
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
    const {
        messages,
        userIdx
    } = props;

    return (
        <>
            {
                messages.map((current, idx) => {
                    const Style: React.CSSProperties = {
                        maxWidth: "58%",
                        padding: "8px",
                        margin: "8px",
                        borderRadius: "6px",
                        wordBreak: "break-word",
                        background: "#a7a2a2",
                    };
                    if (current.idx === '#system') {
                        Style.maxWidth = "100%";
                        Style.textAlign = "center";
                    }
                    if (current.idx === userIdx) {
                        Style.background = "tomato";
                        Style.marginLeft = "auto";
                    }
                    else if (current.idx !== '#system') {
                        Style.background = "#ffffff";
                        Style.marginRight = "auto";
                    }

                    return (
                        <p
                            key={idx}
                            style={Style}
                        >
                            {current.message}
                        </p>
                    );
                })
            }
        </>
    );
}

export default ChatMessage;