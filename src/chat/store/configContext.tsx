import React, { createContext, useState } from 'react';

export const ConfigContext = createContext({
  step: 0,
  handleStep: (step: number) => { },
  room: "",
  handleRoom: (room: string) => { },
  imageSize: 1,
  handleImageSize: (imgsize: number) => { },
  secretKey: '',
  handleSecretKey: (secretKey: string) => { },
});

const ConfigContextProvider: React.FC = ({ children }) => {
  const [step, setStep] = useState(0);
  const handleStep = (step: number) => setStep(step);
  const [room, setRoom] = useState('');
  const handleRoom = (room: string) => setRoom(room);
  const [imageSize, setImageSize] = useState(1);
  const handleImageSize = (imgsize: number) => {
    if (imageSize > 0) setImageSize(Math.floor(imgsize));
  }
  const [secretKey, setSecretKey] = useState('');
  const handleSecretKey = (secretKey: string) => {
    if (secretKey.length > 0) setSecretKey(secretKey);
  }

  return (
    <ConfigContext.Provider
      value={{
        step,
        handleStep,
        room,
        handleRoom,
        imageSize,
        handleImageSize,
        secretKey,
        handleSecretKey,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
