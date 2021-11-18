import React from 'react';
import { render, screen } from '@testing-library/react';

import Layout from './layout';

describe('레이아웃', () => {
    test('render', () => {
        render(<Layout children={"테스트"} />);

        expect(screen.getByRole('header')).toHaveTextContent('WebChat');
        expect(screen.getByRole('main')).toBeVisible();
        expect(screen.getByRole('footer')).toHaveTextContent('Copyright 2021. 류윤종 All Right Reserve.');
        expect(screen.getByRole('main')).toHaveTextContent('테스트');
    });
});