import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Main from './main';

describe('메인 라우트 시작점', () => {
    test('render', () => {
        render(<Main />);
        expect(screen.getByRole('header')).toHaveTextContent('WebChat');
        expect(screen.getByRole('main')).toBeVisible();
        expect(screen.getByRole('footer')).toHaveTextContent('Copyright 2021. 류윤종 All Right Reserve.');

        
        expect(screen.getByText('container width'));
        const container = screen.getByRole('main').querySelector('.container');
        expect(container).toBeInTheDocument();
        fireEvent.click(screen.getByText('800px'));
        expect(screen.getByText('size: 800px'));
        expect(container).toHaveStyle('max-width: 800px');
        fireEvent.click(screen.getByText('400px'));
        expect(screen.getByText('size: 400px'));
        expect(container).toHaveStyle('max-width: 400px');
        fireEvent.click(screen.getByText('350px'));
        expect(screen.getByText('size: 350px'));
        expect(container).toHaveStyle('max-width: 350px');
    });
});