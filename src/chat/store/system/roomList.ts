import { useState } from 'react';

export const initState = {
  roomList: '',
  handleRoomList: (rooms: Array<string>) => {},
};

export function setContext() {
  const [roomList, setRoomList] = useState<Array<any>>([]);
  const handleRoomList = (rooms: Array<string>) => setRoomList(rooms);

  return {
    roomList,
    handleRoomList,
  };
}
