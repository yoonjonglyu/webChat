import React from 'react';

interface WebChatProps {

}

const WebChat: React.FC<WebChatProps> = () => {
    return (
        <article>
            <div className="chat-room">

            </div>
            <form className="chat-form">
                <input type="text" className="chat-input" />
                <button type="button" className="chat-request">전송</button>
            </form>
            채팅창 구현하기
        </article>
    );
}

export default WebChat;