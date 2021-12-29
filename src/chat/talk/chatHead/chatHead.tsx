import React, { useEffect, useState, useContext } from 'react';
import { Socket } from 'socket.io-client';

import UserIcon from '../../assets/user.png';

import ChatEvents from '../../lib/chatEvents';
import { ConfigContext } from '../../store/configContext';
import { ModalContext } from '../../store/modalContext';

interface ChatHeadProps {
    socket: Socket
}

const ChatHead: React.FC<ChatHeadProps> = (props) => {
    const {
        socket
    } = props;
    const [headCount, setHeadCount] = useState<Array<string>>([]);
    const { room } = useContext(ConfigContext);
    const { handleIsModal, handleModal } = useContext(ModalContext);
    const headCountModal = () => {
        handleModal(
            <ul
                style={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    flex: "1",
                    margin: "0",
                    padding: "0",
                    listStyle: "none",
                    overflow: "auto",
                }}
            >
                {
                    headCount.map((id, idx) =>
                        <li
                            key={idx}
                            style={{
                                margin: "8px",
                                textAlign: "center",
                                color: "#e4e2b0"
                            }}
                        >
                            {idx + 1} : {id}
                        </li>
                    )
                }
            </ul>
        );
    }
    const openUserList = () => {
        headCountModal();
        handleIsModal(true);
    }

    useEffect(() => {
        if (room !== '') {
            const Events = new ChatEvents(socket);
            Events.getHeadCount(room, setHeadCount);
        }
    }, [room]);
    useEffect(() => {
        if (headCount.length > 0) {
            headCountModal();
        }
    }, [headCount]);

    return (
        <div
            data-testid="chat-head"
            style={{
                display: "flex",
                height: "48px",
                background: "rgb(230, 221, 196)"
            }}
        >
            <nav
                style={{
                    display: "flex",
                    flex: "1"
                }}
            >
                <img
                    src={UserIcon}
                    style={{
                        width: "30px",
                        height: "30px",
                        margin: "9px",
                    }}
                    onClick={openUserList}
                />
                <h2
                    style={{
                        margin: "12px 0",
                        fontSize: "1rem",
                        color: "rgb(103, 137, 131)"
                    }}
                >
                    {room || "#1"}
                    <span
                        style={{
                            color: "rgb(57, 80, 76)"
                        }}
                    >
                        ({headCount.length})
                    </span>
                </h2>
            </nav>
            <button
                type="button"
                title="방에서 나가기"
                style={{
                    background: "none",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#464545",
                }}
            >
                X
            </button>
        </div >
    )
}

export default ChatHead;