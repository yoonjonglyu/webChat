import React from 'react';
import { render, screen } from '@testing-library/react';

import ChatMessage from './chatMessage';

describe('채팅 메시지', () => {
    test('render', () => {
        render(
            <ChatMessage
                userIdx={'1'}
                messages={[
                    {
                        idx: '1',
                        message: '테스트 입니다.'
                    }
                ]}
            />
        );

        expect(screen.getByText('테스트 입니다.')).toBeInTheDocument();
    });
});

