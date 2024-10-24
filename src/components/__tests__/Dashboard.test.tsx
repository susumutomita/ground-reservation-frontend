import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { SessionProvider } from 'next-auth/react';

// モックの作成
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

jest.mock('@/hooks/useDifyChatbot', () => ({
  useDifyChatbot: jest.fn(),
}));

jest.mock('@/hooks/useFieldData', () => ({
  useFieldData: () => ({ data: [], fetchData: jest.fn() }),
}));

jest.mock('@/hooks/useNotificationSettings', () => ({
  useNotificationSettings: () => ({ saveNotificationSettings: jest.fn() }),
}));

describe('Dashboard', () => {
  it('renders dashboard title', () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );
    expect(screen.getByText('野球場の空き状況ダッシュボード')).toBeInTheDocument();
  });

  it('renders date selector', () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );
    expect(screen.getByText('日付選択')).toBeInTheDocument();
  });

  it('renders field filter', () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );
    expect(screen.getByText('フィルターと通知設定')).toBeInTheDocument();
  });

  it('renders availability table', () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );
    expect(screen.getByText('グラウンドの空き状況')).toBeInTheDocument();
  });

  it('renders update data button', () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );
    expect(screen.getByText('データを更新')).toBeInTheDocument();
  });
});
