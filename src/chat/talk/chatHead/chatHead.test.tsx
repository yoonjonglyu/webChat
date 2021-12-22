import React from 'react';
import { render, screen } from '@testing-library/react';

import ChatHead from './chatHead';

describe('chatHead', () => {
    test('render', () => {
        render(
            <ChatHead />
        );

        expect(screen.getByText('title')).toBeInTheDocument();
    });
});