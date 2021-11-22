import React from 'react';
import { render, screen } from '@testing-library/react';
import { io } from 'socket.io-client';

import WebChat from './webChat';

describe('webChat 채팅창', () => {
    let socket: any;
    beforeAll((done) => {
        socket = io('http://localhost:7778/webChat', {
            transports: ['websocket']
        });
        socket.on('connect', done);
    });
    afterAll(() => {
        socket.close();
    });
    test('render', (done) => {
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
        socket.on('room', (rooms: any) => {
            expect(rooms).toBeEnabled();
            done();
        });
        done();
    });
});