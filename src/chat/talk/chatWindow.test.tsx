import React from 'react';
import { render, screen } from '@testing-library/react';
import { Socket } from '../socket';

import ChatWindow from './chatWindow';

describe('채팅창 부분', () => {
    let socket: any;
    beforeAll((done) => {
        socket = Socket;
        socket.on('connect', done);
    });
    afterAll(() => {
        socket.close();
    });
    test('render', () => {
        const { container } = render(
            <ChatWindow socket={socket} />
        );

        expect(container.querySelector('.chat-room')).toBeVisible();
        expect(container.querySelector('.chat-form')).toBeVisible();
    });
});