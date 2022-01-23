import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import UserMessage from './userMessage';

describe('유저 메시지', () => {
    test('render text', () => {
        render(
            <UserMessage
                message='test'
                openImageModal={() => { }}
                time='오후 12:23'
            />
        );

        expect(screen.getByTestId('user')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('오후 12:23')).toBeInTheDocument();
    });
    test('render img', () => {
        render(
            <UserMessage
                message='@$IMG img'
                openImageModal={() => { }}
                time='오후 12:23'
            />
        );

        expect(screen.getByTestId('user-image')).toBeInTheDocument();
        expect(screen.getByAltText('전송된 이미지')).toBeInTheDocument();
        expect(screen.getByText('오후 12:23')).toBeInTheDocument();

        fireEvent.mouseEnter(screen.getByTestId('user-image'));
        expect(screen.getByText('Download')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Download'));
    });
});