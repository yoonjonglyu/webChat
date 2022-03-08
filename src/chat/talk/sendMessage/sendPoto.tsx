import React, { useContext } from 'react';
import { Socket } from 'socket.io-client';

import PotoIcon from '../../assets/poto.png';

import ChatEvents from '../../lib/chatEvents';
import { ConfigContext } from '../../store/configContext';
import { StoreContext } from '../../store/configureStore';

interface SendPotoProps {
    socket: Socket
}

const SendPoto: React.FC<SendPotoProps> = ({ socket }) => {
    const { room, imageSize } = useContext(ConfigContext);
    const { handleIsModal, handleModalContents } = useContext(StoreContext);
    const openModal = (message: string) => {
        handleModalContents(
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
            const MB = 1024 * 1024;
            const result = Events.sendImage(file[0], room, imageSize * MB);
            if (!result) {
                openModal(`${imageSize}MB 이하의 이미지 파일만 전송 할 수 있습니다.`);
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