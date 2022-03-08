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
            <ChatHead socket={socket} />
        );

        expect(screen.getByTestId('chat-head')).toBeInTheDocument();
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('X');
        expect(screen.getByText('(0)')).toBeInTheDocument();
    });
});