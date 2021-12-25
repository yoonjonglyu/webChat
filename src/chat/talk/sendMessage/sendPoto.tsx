import React, { useContext } from 'react';
import { Socket } from 'socket.io-client';

import PotoIcon from '../../assets/poto.png';

import ChatEvents from '../../lib/chatEvents';
import { RoomContext } from '../../store/room';
import { ModalContext } from '../../store/modalContext';

interface SendPotoProps {
    socket: Socket
}

const SendPoto: React.FC<SendPotoProps> = ({ socket }) => {
    const { room } = useContext(RoomContext);
    const { handleIsModal, handleModal } = useContext(ModalContext);
    const openModal = (message: string) => {
        handleModal(
            <h3
                style={{
                    width: "80%",
                    margin: "0 auto",
                    textAlign: "center",
                    fontSize: "1rem",
                    color: "rgb(94 22 22)",
                }}
            >
                {message}
            </h3>
        );
        handleIsModal(true);
    }
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: FileList | null = e.target.files;
        if (file !== null) {
            const Events = new ChatEvents(socket);
            const result = Events.sendImage(file[0], room);
            if (!result) {
                openModal('500kb 이하의 이미지 파일만 전송 할 수 있습니다.');
            }
        }
        e.target.value = '';
    }

    return (
        <label
            style={{
                display: "flex",
                marginRight: "3px"
            }}
        >
            <img
                src={PotoIcon}
                width="30px"
            />
            <input
                type="file"
                style={{
                    display: "none"
                }}
                onChange={handleFile}
                accept="image/*"
            />
        </label>
    );
}

export default SendPoto;