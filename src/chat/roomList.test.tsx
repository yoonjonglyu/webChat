import React from 'react';
import { render, screen } from '@testing-library/react';

import RoomList from './roomList';

describe('채팅방 리스트', () => {
    test('render', () => {
        render(
            <RoomList />
        );
        expect(screen.getAllByTestId('room-list')).toBeInTheDocument();
    });
});