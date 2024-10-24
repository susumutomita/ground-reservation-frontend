import React from 'react';
import { render, screen } from '@testing-library/react';
import { AvailabilityTable } from '../AvailabilityTable';
import { FieldAvailability } from '@/types';

describe('AvailabilityTable', () => {
  const mockData: FieldAvailability[] = [
    { id: '1', date: '2023-05-01', time: '10:00', field: 'Field A', available: true },
    { id: '2', date: '2023-05-01', time: '11:00', field: 'Field B', available: false },
  ];

  it('renders table headers', () => {
    render(<AvailabilityTable data={mockData} />);
    expect(screen.getByText('日付')).toBeInTheDocument();
    expect(screen.getByText('時間')).toBeInTheDocument();
    expect(screen.getByText('グラウンド')).toBeInTheDocument();
    expect(screen.getByText('空き状況')).toBeInTheDocument();
  });

  it('renders field availability data', () => {
    render(<AvailabilityTable data={mockData} />);
    expect(screen.getByText('2023-05-01')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('Field A')).toBeInTheDocument();
    expect(screen.getByText('空きあり')).toBeInTheDocument();
    expect(screen.getByText('11:00')).toBeInTheDocument();
    expect(screen.getByText('Field B')).toBeInTheDocument();
    expect(screen.getByText('空きなし')).toBeInTheDocument();
  });
});
