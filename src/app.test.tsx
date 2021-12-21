import React from 'react';
import { render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import App from './app';

describe('웹앱 라우트', () => {
    const history = createBrowserHistory();
    test('메인 페이지', () => {
        history.push('/webChat');
        render(
            <App />
        );

        expect(screen.getByText('토마토톡')).toBeInTheDocument();
    });
});