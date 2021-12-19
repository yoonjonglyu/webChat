import React from 'react';
import { render, screen } from '@testing-library/react';

import SendPoto from './sendPoto';

describe('sendPoto', () => {
    test('render', () => {
        render(
            <SendPoto />
        );

        expect(screen.getByRole('img')).toBeVisible();
    });
});