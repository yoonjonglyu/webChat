import React from 'react';

import Layout from '../components/layout';
import WebChat from '../chat/webChat';

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    return (
        <Layout>
            <WebChat />
        </Layout>
    );
}

export default Main;