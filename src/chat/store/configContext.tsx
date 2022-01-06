import React, { createContext, useState } from 'react';

export const ConfigContext = createContext({
  step: 0,
  handleStep: (step: number) => {},
  room: "",
  handleRoom: (room: string) => { },
  imageSize: 1 * 1024 * 1024,
  handleImageSize: (imgsize: number) => { },
});

const ConfigContextProvider: React.FC = ({ children }) => {
  const [step, setStep] = useState(0);
  const handleStep = (step: number) => setStep(step);
  const [room, setRoom] = useState('');
  const handleRoom = (room: string) => setRoom(room);
  const [imageSize, setImageSize] = useState(1 * 1024 * 1024);
  const handleImageSize = (imgsize: number) => {
    if (imageSize > 0) setImageSize(Math.floor(imgsize * 1024 * 1024));
  }

  return (
    <ConfigContext.Provider
      value={{
        step,
        handleStep,
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
