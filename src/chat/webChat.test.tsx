import React from 'react';
import { render, screen } from '@testing-library/react';

import WebChat from './webChat';

describe('webChat 채팅창', () => {
    test('render', () => {
        render(
            <WebChat />
        );
        expect(screen.getByRole('article')).toBeVisible();
        expect(screen.getByText('채팅창 구현하기')).toBeVisible();
    });
});