import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './app';

describe('웹앱 라우트', () => {
    test('메인 페이지', () => {
        render(
            <App />
        );

        expect(screen.getByText('WebChat')).toBeInTheDocument();
    });
});