import React from 'react';

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    return (
        <>
            <header role="header">
                <h1>WebChat</h1>
            </header>
            <main role="main">
                메인
            </main>
            <footer role="footer">
                <small>
                    Copyright 2021. 류윤종 All Right Reserve.
                </small>
            </footer>
        </>
    );
}

export default Main;