import React, { useState, useEffect, useRef, useContext } from 'react';
import { Socket } from 'socket.io-client';

import ChatMessage from './chatMessage';

import ChatEvents from '../../lib/chatEvents';
import { StoreContext } from '../../store/configureStore';

interface ChatRoomProps {
  socket: Socket;
}

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
  const { socket } = props;
  const [userId, setUserId] = useState('');
  const [chatLog, setChatLog] = useState<
    Array<{
      idx: string;
      message: string;
      time: string;
    }>
  >([]);
  const { secretKey } = useContext(StoreContext);

  useEffect(() => {
    const Events = new ChatEvents(socket, secretKey);
    Events.receiveMessages((msg: { idx: string; message: string }) => {
      setChatLog((arr) => [
        ...arr,
        {
          ...msg,
          time: `${new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}`,
        },
      ]);
    });

    setUserId(socket.id);

    return () => {
      setChatLog([]);
      setUserId('');
    };
  }, []);

  const Room: any = useRef(null);
  useEffect(() => {
    if (chatLog.length > 0) {
      if (Room.current.scroll) {
        Room.current.scroll(0, Room.current.scrollHeight);
      }
    }
  }, [chatLog]);

  return (
    <div
      data-testid='chat-room'
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        flex: '1 0px',
        background: '#E6DDC4',
        overflow: 'auto',
      }}
      ref={Room}>
      <ChatMessage messages={chatLog} userId={userId} />
    </div>
  );
};

export default ChatRoom;
