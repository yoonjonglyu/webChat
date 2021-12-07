import React, { useState } from 'react';

interface SendNickNameProps {
}

const SendNickName: React.FC<SendNickNameProps> = () => {
    const [nickName, setNickName] = useState('');
    const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(e.target.value);
    }
    const sendNickName = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(nickName);
    }

    return (
        <div>
            <form onSubmit={sendNickName}>
                <label>대화에 사용하실 닉네임을 입력해주세요.</label>
                <input type="text" value={nickName} onChange={handleNickName} />
                <button type="button">채팅시작</button>
            </form>
        </div>
    );
}

export default SendNickName;