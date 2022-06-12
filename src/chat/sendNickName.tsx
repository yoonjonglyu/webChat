import React, { useState, useContext } from 'react';

import { StoreContext } from './store/configureStore';

import ChatStatus from './constants/chatStatus';

interface SendNickNameProps {}

const SendNickName: React.FC<SendNickNameProps> = () => {
  const [nickName, setNickName] = useState('');
  const { handleStep, roomList, userInfo, handleUserInfo } =
    useContext(StoreContext);

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const sendNickName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickName.length > 0) {
      handleUserInfo({ ...userInfo, nickName });
      handleStep(checkRoomListAvail);
    }

    function checkRoomListAvail() {
      return roomList.length === 1 ? ChatStatus.chatroom : ChatStatus.roomList;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 'auto',
        justifyContent: 'center',
        background: 'tomato',
      }}>
      <form
        onSubmit={sendNickName}
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          maxWidth: '50%',
          justifyContent: 'center',
        }}>
        <label
          htmlFor='nickName'
          style={{
            marginBottom: '50px',
            textAlign: 'center',
            fontSize: '0.9rem',
          }}>
          <h2>대화에 사용하실 닉네임을 입력해주세요.</h2>
        </label>
        <input
          type='text'
          id='nickName'
          value={nickName}
          onChange={handleNickName}
        />
        <button>채팅시작</button>
      </form>
    </div>
  );
};

export default SendNickName;
