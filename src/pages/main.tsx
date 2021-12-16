import React, { useState } from 'react';
import StyledComponents from 'styled-components'

import Layout from '../components/layout';
import ChatConfig from '../chat/chatConfig';

const Widget = StyledComponents.section`
    position: absolute;
    right: 10px;
    top: 50%;
    z-index: 999999;
    &:hover {
        
    }
    
`;
const WidgetList = StyledComponents.ul`
    list-style: none;
`;

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    const WebChat = ChatConfig({
        url: 'http://localhost:444/webChat' ||  'https://chatting-serve.herokuapp.com/webChat'
    });
    const [container, setContainer] = useState<'800' | '400' | '350'>('800');

    const handleContainer = (width: typeof container) => {
        setContainer(width);
    }

    return (
        <Layout>
            <Widget>
                <WidgetList>
                    <li><h2>container width</h2></li>
                    <li><span>size: {container}px</span></li>
                    <li>
                        <button type="button" onClick={() => handleContainer('800')}>
                            800px
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={() => handleContainer('400')}>
                            400px
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={() => handleContainer('350')}>
                            350px
                        </button>
                    </li>
                </WidgetList>
            </Widget>
            <section
                className="container"
                style={{
                    display: "flex",
                    flex: "1",
                    maxWidth: `${container}px`,
                    maxHeight: "645px"
                }}
            >
                <WebChat />
            </section>
        </Layout>
    );
}

export default Main;