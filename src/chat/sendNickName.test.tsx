import React from 'react';
import { render, screen } from '@testing-library/react';

import SendNickName from './sendNickName';

describe('sendNickName', () => {
    test('render', () => {
        render(
            <SendNickName />
        );

        expect(screen.getByText('대화에 사용하실 닉네임을 입력해주세요.')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('채팅시작');
    });
});