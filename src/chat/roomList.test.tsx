import React from 'react';
import { render, screen } from '@testing-library/react';

import RoomList from './roomList';

describe('채팅방 리스트', () => {
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
            />
        );
        expect(screen.getByTestId('room-list')).toBeInTheDocument();
        expect(screen.getByText('참여 가능한 채팅방 목록')).toBeInTheDocument();
        expect(screen.getByTestId('rooms')).toBeInTheDocument();
        expect(screen.getByText('채팅방#1')).toBeInTheDocument();
        expect(screen.getByText('#3')).toBeInTheDocument();
    });
});