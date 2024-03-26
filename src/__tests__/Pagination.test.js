import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

test('pagination changes page when clicked', () => {
  const mockPaginate = jest.fn();
  render(<Pagination pokemonsPerPage={10} totalPokemons={100} paginate={mockPaginate} />);

  const page2Button = screen.getByRole('link', { name: /2/i });
  fireEvent.click(page2Button);

  expect(mockPaginate).toHaveBeenCalledWith(2);
});