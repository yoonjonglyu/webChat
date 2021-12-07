import React from 'react';
import { render, act } from '@testing-library/react';
import { Socket } from '../socket';

import ChatRoom from './chatRoom';

describe('chatRoom 채팅 메시지 보기', () => {
    let socket: any;
    beforeAll((done) => {
        socket = Socket;
        socket.on('connect', done);
    });
    afterAll(() => {
        socket.close();
    });

    test('socket', (done) => {
        act(() => {
            render(
                <ChatRoom socket={socket} />
            );
        });
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