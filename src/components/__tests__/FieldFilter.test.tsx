import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FieldFilter } from '../FieldFilter';

describe('FieldFilter', () => {
  const mockSetSelectedField = jest.fn();
  const uniqueFields = ['Field A', 'Field B', 'Field C'];

  it('renders field filter', () => {
    render(
      <FieldFilter
        selectedField={undefined}
        setSelectedField={mockSetSelectedField}
        uniqueFields={uniqueFields}
      />
    );
    expect(screen.getByText('グラウンドを選択')).toBeInTheDocument();
  });

  it('shows all fields in the dropdown', () => {
    render(
      <FieldFilter
        selectedField={undefined}
        setSelectedField={mockSetSelectedField}
        uniqueFields={uniqueFields}
      />
    );
    fireEvent.click(screen.getByText('グラウンドを選択'));
    expect(screen.getByText('全てのグラウンド')).toBeInTheDocument();
    uniqueFields.forEach((field) => {
      expect(screen.getByText(field)).toBeInTheDocument();
    });
  });

  it('calls setSelectedField when a field is selected', () => {
    render(
      <FieldFilter
        selectedField={undefined}
        setSelectedField={mockSetSelectedField}
        uniqueFields={uniqueFields}
      />
    );
    fireEvent.click(screen.getByText('グラウンドを選択'));
    fireEvent.click(screen.getByText('Field A'));
    expect(mockSetSelectedField).toHaveBeenCalledWith('Field A');
  });
});
