import { useState } from 'react';

export const initState = {
  userInfo: { nickName: '' },
  handleStep: (userInfo: { nickName: string }) => {},
};

export function setContext() {
  const [userInfo, setUserInfo] = useState({ nickName: 'unknown' });
  const handleUserInfo = (userInfo: { nickName: string }) =>
    setUserInfo(userInfo);

  return {
    userInfo,
    handleUserInfo,
  };
}
