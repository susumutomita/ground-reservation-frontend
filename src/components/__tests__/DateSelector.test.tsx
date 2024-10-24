import React from 'react';
import { render, screen } from '@testing-library/react';
import { DateSelector } from '../DateSelector';

describe('DateSelector', () => {
  it('renders date selector title', () => {
    render(<DateSelector />);
    expect(screen.getByText('日付選択')).toBeInTheDocument();
  });

  it('renders calendar component', () => {
    render(<DateSelector />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
