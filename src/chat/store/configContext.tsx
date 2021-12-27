import React, { createContext, useState } from 'react';

export const ConfigContext = createContext({
  room: "",
  handleRoom: (room: string) => { },
  imageSize: 500 * 1024,
  handleImageSize: (imgsize: number) => { },
});

const ConfigContextProvider: React.FC = ({ children }) => {
  const [room, setRoom] = useState('');
  const handleRoom = (room: string) => setRoom(room);
  const [imageSize, setImageSize] = useState(500 * 1024);
  const handleImageSize = (imgsize: number) => setImageSize(imgsize);

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
