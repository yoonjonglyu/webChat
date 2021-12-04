import React from 'react';

import Layout from '../components/layout';
import ChatConfig from '../chat/chatConfig';

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    const WebChat = ChatConfig({
        url: 'http://localhost:444/webChat'
    });

    return (
        <Layout>
            <WebChat />
        </Layout>
    );
}

export default Main;