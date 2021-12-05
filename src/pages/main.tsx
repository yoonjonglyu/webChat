import React, { useState } from 'react';

import Layout from '../components/layout';
import ChatConfig from '../chat/chatConfig';

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    const WebChat = ChatConfig({
        url: 'http://localhost:444/webChat' || 'https://chatting-serve.herokuapp.com/webChat'
    });
    const [container, setContainer] = useState<'800' | '500' | '400'>('800');

    const handleContainer = (width: typeof container) => {
        setContainer(width);
    }

    return (
        <Layout>
            <section>
                <ul>
                    <li><h2>container width</h2></li>
                    <li><span>size: {container}px</span></li>
                    <li>
                        <button type="button" onClick={() => handleContainer('800')}>
                            800px
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={() => handleContainer('500')}>
                            500px
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={() => handleContainer('400')}>
                            400px
                        </button>
                    </li>
                </ul>
            </section>
            <section
                className="container"
                style={{
                    display: "flex",
                    maxWidth: `${container}px`
                }}
            >
                <WebChat />
            </section>
        </Layout>
    );
}

export default Main;