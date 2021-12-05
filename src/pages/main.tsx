import React from 'react';

import Layout from '../components/layout';
import ChatConfig from '../chat/chatConfig';

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    const WebChat = ChatConfig({
        url: 'https://chatting-serve.herokuapp.com/webChat'
    });

    return (
        <Layout>
            <WebChat />
        </Layout>
    );
}

export default Main;