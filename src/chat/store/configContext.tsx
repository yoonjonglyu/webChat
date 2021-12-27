import React, { createContext, useState } from 'react';

export const ConfigContext = createContext({
  room: "",
  handleRoom: (room: string) => { },
  imageSize: 1 * 1024 * 1024,
  handleImageSize: (imgsize: number) => { },
});

const ConfigContextProvider: React.FC = ({ children }) => {
  const [room, setRoom] = useState('');
  const handleRoom = (room: string) => setRoom(room);
  const [imageSize, setImageSize] = useState(1 * 1024 * 1024);
  const handleImageSize = (imgsize: number) => {
    if (imageSize > 0) setImageSize(Math.floor(imgsize * 1024 * 1024));
  }

  return (
    <ConfigContext.Provider
      value={{
        room,
        handleRoom,
        imageSize,
        handleImageSize
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
