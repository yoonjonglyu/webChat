import React from 'react';

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
    const {
        children
    } = props;
    return (
        <>
            <header role="header">
                <h1>WebChat</h1>
            </header>
            <main role="main">
                {children}
            </main>
            <footer role="footer">
                <small>
                    Copyright 2021. 류윤종 All Right Reserve.
                </small>
            </footer>
        </>
    );
}

export default Layout;