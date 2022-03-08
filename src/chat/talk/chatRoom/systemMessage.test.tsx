import React from 'react';
import { render, screen } from '@testing-library/react';

import SystemMessage from './systemMessage';

describe('시스템 메시지', () => {
    test('render', () => {
        render(
            <SystemMessage
                message='test'
            />
        );
        
        expect(screen.getByTestId('system')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
    });
});