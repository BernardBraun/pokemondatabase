import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import PokemonDetails from '../components/PokemonDetails';

test('renders Pokémon details', () => {
  const mockPokemon = {
    name: 'Bulbasaur',
    sprites: { front_default: 'bulbasaur.png' },
    types: [{ type: { name: 'grass' } }],
    abilities: [{ ability: { name: 'overgrow' } }],
    stats: [{ stat: { name: 'hp' }, base_stat: 45 }],
  };

  render(
    <MemoryRouter initialEntries={['/pokemon/bulbasaur']}>
      <Route path="/pokemon/:name">
        <PokemonDetails />
      </Route>
    </MemoryRouter>
  );

  const nameElement = screen.getByText(/bulbasaur/i);
  expect(nameElement).toBeInTheDocument();

  const typeElement = screen.getByText(/grass/i);
  expect(typeElement).toBeInTheDocument();
});