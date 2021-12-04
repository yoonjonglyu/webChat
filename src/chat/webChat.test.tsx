import React from 'react';
import { render, screen } from '@testing-library/react';
import { Socket } from './socket';

import WebChat from './webChat';

describe('webChat 채팅창', () => {
    let socket: any;
    beforeAll((done) => {
        socket = Socket;
        socket.on('connect', done);
    });
    afterAll(() => {
        socket.close();
    });
    test('socket', (done) => {
        socket.on('receive', (msg: {
            idx: string,
            message: string
        }) => {
            expect(msg.message).toBe('테스트 메시지입니다.');
            done();
        });
        socket.emit('send', {
            socketIdx: socket.id,
            message: '테스트 메시지입니다.',
            room: '#1'
        });
    });
    
    test('render', () => {
        const { container } = render(
            <WebChat socket={socket} />
        );

        expect(screen.getByRole('article')).toBeVisible();
        const chatBox = container.querySelector('.chat-room');
        expect(chatBox).toBeVisible();
        const chatInput = container.querySelector('.chat-form');
        expect(chatInput).toBeVisible();
        expect(chatInput?.querySelector('.chat-input')).toBeVisible();
        expect(chatInput?.querySelector('.chat-request')).toHaveTextContent('전송');
    });
});