import React from 'react';

interface SendNickNameProps {

}

const SendNickName: React.FC<SendNickNameProps> = () => {
    return (
        <div>
            <form>
                <label>대화에 사용하실 닉네임을 입력해주세요.</label>
                <input type="text" />
                <button type="button">채팅시작</button>
            </form>
        </div>
    );
}

export default SendNickName;