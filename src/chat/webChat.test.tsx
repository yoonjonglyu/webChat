import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Socket } from './socket';

import WebChat from './webChat';

describe('webChat 채팅창', () => {
    let socket: any;
    beforeAll((done) => {
        socket = Socket;
        socket.on('connect', done);
        socket.emit('join', {
            socketIdx: socket.id,
            room: '#1'
        });
    });
    afterAll(() => {
        socket.close();
    });
    test('socket', (done) => {
        socket.emit('join', {
            socketIdx: socket.id,
            room: '#1'
        });
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

    test('render 연결중', () => {
        render(
            <WebChat socket={socket} />
        );
        expect(screen.getByRole('article')).toBeVisible();
        expect(screen.getByText('연결중입니다.')).toBeInTheDocument();
    });
    test('render 채팅창', (done) => {
        const { container } = render(
            <WebChat socket={socket} />
        );
        fireEvent.click(screen.getByRole('article'));
        
        const chatBox = container.querySelector('.chat-room');
        expect(chatBox).toBeVisible();
        const chatInput = container.querySelector('.chat-form');
        expect(chatInput).toBeVisible();
        expect(chatInput?.querySelector('.chat-input')).toBeVisible();
        expect(chatInput?.querySelector('.chat-request')).toHaveTextContent('전송');
        done();
    });
});