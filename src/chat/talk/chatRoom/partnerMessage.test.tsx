import React from 'react';
import { render, screen } from '@testing-library/react';

import PartnerMessage from './partnerMessage';

describe('시스템 메시지', () => {
    test('render', () => {
        render(
            <PartnerMessage
                message='test'
            />
        );
        
        expect(screen.getByTestId('partner')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
    });
});