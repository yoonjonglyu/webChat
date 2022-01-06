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
        fireEvent.click(screen.getByText('#1'));
        expect(await screen.findByTestId('chat-room')).toBeVisible();
        expect(await screen.findByTestId('chat-form')).toBeVisible();
        expect(await screen.findByTestId('chat-input')).toBeVisible();
    });
});