import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    test('render 채팅창', async () => {
        render(
            <WebChat socket={socket} />
        );
        expect(screen.getByRole('article')).toBeVisible();
        fireEvent.click(screen.getByRole('article'));
        expect(await screen.findByTestId('chat-room')).toBeVisible();
        expect(await screen.findByTestId('chat-form')).toBeVisible();
        expect(await screen.findByTestId('chat-input')).toBeVisible();
    });
});