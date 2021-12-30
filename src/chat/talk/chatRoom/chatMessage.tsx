import React, { useContext } from 'react';

import SystemMessage from './systemMessage';
import PartnerMessage from './partnerMessage';

import { ModalContext } from '../../store/modalContext';

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
    const { handleIsModal, handleModal } = useContext(ModalContext);
    const openImageModal = (src: string) => {
        handleModal(
            <img
                src={src}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%"
                }}
            />
        );
        handleIsModal(true);
    }

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
                        background: "#fff",
                        borderRadius: "6px",
                    };
                    const boxStyle: React.CSSProperties = {
                        display: "flex",
                        flex: "1",
                        flexFlow: "column",
                        width: "100%",
                        margin: 0,
                    };
                    if (current.idx === userId) {
                        messageStyle.background = "tomato";
                        boxStyle.marginLeft = "auto";
                        boxStyle.flexFlow = "row-reverse";
                    }
                    else if (current.idx !== '#system') {
                        boxStyle.marginRight = "auto";
                        boxStyle.flexFlow = "row";
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
                                {
                                    current.idx === '#system' &&
                                    <SystemMessage
                                        message={current.message}
                                    />
                                }
                                {
                                    current.idx !== '#system' && current.idx !== userId &&
                                    (current.message.slice(0, 5) !== '@$IMG' ?
                                        <PartnerMessage
                                            message={current.message}
                                        /> :
                                        <img
                                            src={current.message.slice(5)}
                                            style={messageStyle}
                                            onClick={() => openImageModal(current.message.slice(5))}
                                        />)

                                }
                                {
                                    current.idx !== '#system' && current.idx === userId &&
                                    (current.message.slice(0, 5) !== '@$IMG' ?
                                        <span
                                            style={{
                                                maxWidth: "58%",
                                                padding: "8px",
                                                margin: "8px",
                                                fontSize: "1rem",
                                                color: "#1b1b1b",
                                                wordBreak: "break-word",
                                                background: "tomato",
                                                borderRadius: "6px",
                                            }}
                                        >
                                            {current.message}
                                        </span> :
                                        <img
                                            src={current.message.slice(5)}
                                            style={messageStyle}
                                            onClick={() => openImageModal(current.message.slice(5))}
                                        />)
                                }
                                {
                                    current.idx !== '#system' &&
                                    < time
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