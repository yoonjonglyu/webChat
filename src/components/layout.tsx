import React from 'react';
import StyledComponents, { createGlobalStyle } from 'styled-components';


const CommonStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        background-color: #ece9e9;
        // #131313
    }
    #app {
        display: flex;
        flex-flow: column wrap;
    }
`;
const Header = StyledComponents.header`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100px;
    margin: 0;
    padding: 12px;
`;
const Logo = StyledComponents.h1`
    color: #F58840;
`;
const Main = StyledComponents.main`
    display: flex;
    justify-content: center;
    flex: 1 90vh;
    margin: 3px 0;
`;
const Footer = StyledComponents.footer`
    display: flex;
    justify-content: center;
`;
const Copy = StyledComponents.small`
    color: #535252;
`;

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
    const {
        children
    } = props;
    return (
        <>
            <CommonStyle />
            <Header role="header">
                <Logo>WebChat</Logo>
            </Header>
            <Main role="main">
                {children}
            </Main>
            <Footer role="footer">
                <Copy>
                    Copyright 2021. 류윤종 All Right Reserve.
                </Copy>
            </Footer>
        </>
    );
}

export default Layout;