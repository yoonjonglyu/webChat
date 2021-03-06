import React from 'react';
import { render, screen } from '@testing-library/react';

import Modal from './modal';

describe('채팅 모달', () => {
    test('render', () => {
        render(
            <Modal />
        );

        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getByTestId('modal-box')).toBeInTheDocument();
    });
});