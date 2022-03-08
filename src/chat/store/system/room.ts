import { useState } from 'react';

export const initState = {
    room: "",
    handleRoom: (room: string) => { },
};

export function setContext(){
    const [room, setRoom] = useState('');
    const handleRoom = (room: string) => setRoom(room);

    return {
        room,
        handleRoom    
    };
}