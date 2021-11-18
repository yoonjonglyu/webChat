import React from 'react';
import { render, screen } from '@testing-library/react';

import Main from './main';

describe('메인 라우트 시작점', () => {
    test('render', () => {
        render(<Main />);
        
        expect(screen.getByText('메인')).toBeInTheDocument();
    });
});