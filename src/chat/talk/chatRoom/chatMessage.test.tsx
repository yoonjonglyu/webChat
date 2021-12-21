import React from 'react';
import { render, screen } from '@testing-library/react';

import ChatMessage from './chatMessage';

describe('채팅 메시지', () => {
    test('render', () => {
        render(
            <ChatMessage
                userId={'1'}
                messages={[
                    {
                        idx: '12',
                        message: '테스트 입니다.',
                        time: '오후 12:23'
                    }
                ]}
            />
        );

        expect(screen.getByText('테스트 입니다.')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('오후 12:23')).toBeInTheDocument();
    });
});

