import React, { useContext } from 'react';
import { Socket } from 'socket.io-client';

import PotoIcon from '../../assets/poto.png';

import ChatEvents from '../../lib/chatEvents';
import { RoomContext } from '../../store/room';

interface SendPotoProps {
    socket: Socket
}

const SendPoto: React.FC<SendPotoProps> = ({ socket }) => {
    const { room } = useContext(RoomContext);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: FileList | null = e.target.files;
        if (file !== null) {
            const Events = new ChatEvents(socket);
            const result = Events.sendImage(file[0], room);
            if (!result) {
                alert('500kb 이하의 이미지 파일만 전송 할 수 있습니다.');
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