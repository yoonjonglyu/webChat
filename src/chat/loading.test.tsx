import React from 'react';
import { render, screen } from '@testing-library/react';

import Loading from './loading';

describe('loading', () => {
  test('연결중', () => {
    render(<Loading state={0} />);

    expect(screen.getByText('연결중입니다.')).toBeInTheDocument();
  });
  test('연결실패 또는 해제', () => {
    render(<Loading state={1} />);

    expect(
      screen.getByText('채팅 서버 상태를 확인해주세요.'),
    ).toBeInTheDocument();
  });
  test('채팅창 목록 기다리기', () => {
    render(<Loading state={2} />);

    expect(
      screen.getByText('채팅방 목록을 받아오는 중입니다.'),
    ).toBeInTheDocument();
  });
});
