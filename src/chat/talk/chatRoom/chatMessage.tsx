import React, { useContext } from 'react';

import SystemMessage from './systemMessage';
import PartnerMessage from './partnerMessage';
import UserMessage from './userMessage';

import { StoreContext } from '../../store/configureStore';

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
    const { handleIsModal, handleModalContents } = useContext(StoreContext);
    const openImageModal = (src: string) => {
        handleModalContents(
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
                    return (
                        <article
                            key={idx}
                            style={{
                                display: "flex",
                                flexFlow: "column",
                            }}
                        >
                            {
                                current.idx === '#system' &&
                                <SystemMessage
                                    message={current.message}
                                />
                            }
                            {
                                current.idx !== '#system' && current.idx !== userId &&
                                <PartnerMessage
                                    idx={current.idx}
                                    message={current.message}
                                    openImageModal={openImageModal}
                                    time={current.time}
                                />

                            }
                            {
                                current.idx !== '#system' && current.idx === userId &&
                                <UserMessage
                                    message={current.message}
                                    openImageModal={openImageModal}
                                    time={current.time}
                                />
                            }
                        </article>
                    );
                })
            }
        </>
    );
}

export default ChatMessage;