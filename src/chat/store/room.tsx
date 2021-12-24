import React, { createContext, useState } from 'react';

export const RoomContext = createContext({
  room: "",
  handleRoom: (data: string) => { }
});

const RoomContextProvider: React.FC = ({ children }) => {
  const [room, setRoom] = useState('');
  const handleRoom = (data: string) => setRoom(data);

  return (
    <RoomContext.Provider value={{ room, handleRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
