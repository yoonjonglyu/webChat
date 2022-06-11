import React, { useEffect, useState, useContext } from 'react';
import { Socket } from 'socket.io-client';

import Loading from './loading';
import SendNickName from './sendNickName';
import RoomList from './roomList';
import ChatWindow from './talk/chatWindow';
import Modal from './modal';

import ChatEvents from './lib/chatEvents';
import { StoreContext } from './store/configureStore';

import ChatStatus from './constants/chatStatus';

interface WebChatProps {
  socket: Socket;
  config?: ConfigProps;
}
interface ConfigProps {
  imageSize?: number;
  secretKey?: string;
}

const WebChat: React.FC<WebChatProps> = (props) => {
  const { socket, config } = props;
  const { isModal, handleImageSize, handleSecretKey, step, handleStep } =
    useContext(StoreContext);
  useEffect(() => {
    if (config?.imageSize) handleImageSize(config.imageSize);
    if (config?.secretKey) handleSecretKey(config.secretKey);
  }, []);

  const Events = new ChatEvents(socket);
  const [rooms, setRooms] = useState<Array<string>>([]);
  useEffect(() => {
    Events.handleConnect(() => {
      handleStep(ChatStatus.waitRoom);
      Events.getRooms(setRooms);
    });
    Events.handleDisConnect(() => {
      handleStep(ChatStatus.error);
    });
    Events.handleError(() => {
      handleStep(ChatStatus.error);
    });
    return () => {
      socket.close();
    };
  }, [socket]);
  useEffect(() => {
    if (rooms.length > 0) handleStep(ChatStatus.setNickName);
  }, [rooms]);

  return (
    <article
      style={{
        display: 'flex',
        flexFlow: 'column wrap',
        flex: '1',
        justifyContent: 'center',
        position: 'relative',
        border: '1px solid #678983',
      }}>
      {isModal && <Modal />}
      {step < ChatStatus.setNickName && <Loading state={step} />}
      {step === ChatStatus.setNickName && <SendNickName />}
      {step === ChatStatus.roomList && (
        <RoomList rooms={rooms} socket={socket} />
      )}
      {step > ChatStatus.chatroom && <ChatWindow socket={socket} />}
    </article>
  );
};

export default WebChat;
