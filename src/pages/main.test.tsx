import React from 'react';
import { render, screen } from '@testing-library/react';

import Main from './main';

describe('메인 라우트 시작점', () => {
    test('render', () => {
        render(<Main />);
        
        expect(screen.getByRole('header')).toHaveTextContent('WebChat');
        expect(screen.getByRole('main')).toBeVisible();
        expect(screen.getByRole('main')).toHaveTextContent('채팅창 구현하기');
        expect(screen.getByRole('footer')).toHaveTextContent('Copyright 2021. 류윤종 All Right Reserve.');
        expect(screen.getByText('메인')).toBeInTheDocument();
    });
});