import React from 'react';
import { render, screen } from '@testing-library/react';

import PartnerMessage from './partnerMessage';

describe('파트너 메시지', () => {
    test('render text', () => {
        render(
            <PartnerMessage
                idx='1'
                message='test'
                openImageModal={() => { }}
                time='오후 12:23'
            />
        );
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByTestId('partner')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('오후 12:23')).toBeInTheDocument();
    });
    test('render img', () => {
        render(
            <PartnerMessage
                idx='1'
                message='@$IMG img'
                openImageModal={() => { }}
                time='오후 12:23'
            />
        );
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByTestId('partner-image')).toBeInTheDocument();
        expect(screen.getByAltText('전송된 이미지')).toBeInTheDocument();
        expect(screen.getByText('오후 12:23')).toBeInTheDocument();
    });
});