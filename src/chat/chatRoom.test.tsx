import React from 'react';
import { render, screen } from '@testing-library/react';
import { io } from 'socket.io-client';

import ChatRoom from './chatRoom';

describe('chatRoom 채팅 메시지 보기', () => {
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

    test('socket', (done) => {
        render(
            <ChatRoom socket={socket} />
        );
        socket.on('receive', (msg: {
            idx: string,
            message: string
        }) => {
            expect(msg.message).toBe('메시지 수신 테스트');
            done();
        });
        socket.emit('send', {
            socketIdx: socket.id,
            message: '메시지 수신 테스트',
            room: '#1'
        });
        socket.on('joinRoom', (id: string) => {
            expect(id).toBe(socket.id);
            done();
        });
        socket.emit('joinRoom', socket.id);
        socket.on('leaveRoom', (id: string) => {
            expect(id).toBe(socket.id);
            done();
        });
        socket.emit('leaveRoom', socket.id);
    });
});