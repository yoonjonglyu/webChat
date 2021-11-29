import React from 'react';
import { render, screen } from '@testing-library/react';
import { io } from 'socket.io-client';

import SendForm from './sendForm';

describe('sendForm 채팅 메시지 입력 폼', () => {
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
            <SendForm socket={socket} />
        );
        socket.on('receive', (msg: {
            socketIdx: string,
            message: string,
            room: string
        }) => {
            expect(msg.message).toBe('메시지 전송 테스트');
            done();
        });
        socket.emit('send', {
            socketIdx: socket.id,
            message: '메시지 전송 테스트',
            room: '#1'
        });
    });
});