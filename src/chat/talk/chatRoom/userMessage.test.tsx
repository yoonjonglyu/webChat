import React from 'react';
import { render, screen } from '@testing-library/react';

import UserMessage from './userMessage';

describe('유저 메시지', () => {
    test('render text', () => {
        render(
            <UserMessage
                message='test'
                openImageModal={() => { }}
            />
        );

        expect(screen.getByTestId('user')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
    });
    test('render img', () => {
        render(
            <UserMessage
                message='@$IMG img'
                openImageModal={() => { }}
            />
        );

        expect(screen.getByTestId('user-image')).toBeInTheDocument();
        expect(screen.getByAltText('전송된 이미지')).toBeInTheDocument();
    });
});