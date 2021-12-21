import React from 'react';
import { render, screen } from '@testing-library/react';

import { Socket } from '../../socket';

import SendPoto from './sendPoto';

describe('sendPoto', () => {
    let socket: any;
    beforeAll((done) => {
        socket = Socket;
        socket.on('connect', done);
    });
    afterAll(() => {
        socket.close();
    });
    test('render', () => {
        render(
            <SendPoto socket={socket} />
        );

        expect(screen.getByRole('img')).toBeVisible();
    });
    test('socket', (done) => {
        render(
            <SendPoto socket={socket} />
        );
        socket.emit('join', {
            socketIdx: socket.id,
            room: '#1'
        });
        socket.on('receive', (msg: {
            idx: string,
            message: string
        }) => {
            expect(msg.message).toBe('base64 전송 테스트');
            done();
        });
        socket.emit('send', {
            socketIdx: socket.id,
            message: 'base64 전송 테스트',
            room: '#1'
        });
    });
});