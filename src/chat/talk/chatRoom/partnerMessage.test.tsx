import React from 'react';
import { render, screen } from '@testing-library/react';

import PartnerMessage from './partnerMessage';

describe('파트너 메시지', () => {
    test('render text', () => {
        render(
            <PartnerMessage
                message='test'
                openImageModal={() => { }}
            />
        );

        expect(screen.getByTestId('partner')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
    });
    test('render img', () => {
        render(
            <PartnerMessage
                message='@$IMG img'
                openImageModal={() => { }}
            />
        );

        expect(screen.getByTestId('partner-image')).toBeInTheDocument();
        expect(screen.getByAltText('전송된 이미지')).toBeInTheDocument();
    });
});