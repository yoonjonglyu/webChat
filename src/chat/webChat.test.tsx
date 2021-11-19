import React from 'react';
import { render, screen } from '@testing-library/react';

import WebChat from './webChat';

describe('webChat 채팅창', () => {
    test('render', () => {
        const { container } = render(
            <WebChat />
        );

        expect(screen.getByRole('article')).toBeVisible();
        const chatBox = container.querySelector('.chat-room');
        expect(chatBox).toBeVisible();
        const chatInput = container.querySelector('.chat-form');
        expect(chatInput).toBeVisible();
        expect(chatInput?.querySelector('.chat-input')).toBeVisible();
        expect(chatInput?.querySelector('.chat-request')).toHaveTextContent('전송')
        expect(screen.getByText('채팅창 구현하기')).toBeVisible();
    });
});