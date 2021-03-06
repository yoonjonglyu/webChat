import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Socket } from './socket';

import RoomList from './roomList';

describe('채팅방 리스트', () => {
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
            <RoomList
                rooms={[
                    '채팅방#1',
                    '#1',
                    '#2',
                    '#3',
                    '#4'
                ]}
                socket={socket}
            />
        );
        expect(screen.getByTestId('room-list')).toBeInTheDocument();
        expect(screen.getByText('참여 가능한 채팅방 목록')).toBeInTheDocument();
        expect(screen.getByTestId('rooms')).toBeInTheDocument();
        expect(screen.getByText('채팅방#1 (0)')).toBeInTheDocument();
        expect(screen.getByText('#3 (0)')).toBeInTheDocument();
    });
    test('socket', (done) => {
        render(
            <RoomList
                rooms={[
                    '채팅방#1',
                    '#1',
                    '#2',
                    '#3',
                    '#4'
                ]}
                socket={socket}
            />
        );

        socket.on('joinRoom', (id: string) => {
            expect(id).toBe(socket.id);
            done();
        });
        fireEvent.click(screen.getByText('채팅방#1 (0)'));
    });
});