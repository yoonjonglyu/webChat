import React from 'react';
import { Socket } from 'socket.io-client';

import PotoIcon from '../assets/poto.png';

import ChatEvents from '../lib/chatEvents';

interface SendPotoProps {
    socket: Socket
}

const SendPoto: React.FC<SendPotoProps> = ({ socket }) => {
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: FileList | null = e.target.files;
        if (file !== null) {
            const Events = new ChatEvents(socket);
            const result = Events.sendImage(file[0]);
            if (!result) {
                alert('이미지 파일이 아닙니다.');
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