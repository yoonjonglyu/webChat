import React from 'react';
import { render, screen } from '@testing-library/react';
import { Socket } from '../../socket';

import ChatHead from './chatHead';

describe('chatHead', () => {
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
            <ChatHead
                room='#1'
                socket={socket}
            />
        );

        expect(screen.getByTestId('chat-head')).toBeInTheDocument();
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('나가기');
    });
});