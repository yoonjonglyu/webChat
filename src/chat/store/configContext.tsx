import React, { createContext, useState } from 'react';

export const ConfigContext = createContext({
  room: "",
  handleRoom: (data: string) => { }
});

const ConfigContextProvider: React.FC = ({ children }) => {
  const [room, setRoom] = useState('');
  const handleRoom = (data: string) => setRoom(data);

  return (
    <ConfigContext.Provider value={{ room, handleRoom }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;
