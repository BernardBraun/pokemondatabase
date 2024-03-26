import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importe o MemoryRouter
import PokemonList from '../components/PokemonList';

test('renders list of Pokémon', () => {
  const mockPokemons = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Charmander' },
    { id: 3, name: 'Squirtle' },
  ];

  render(
    <MemoryRouter> {/* Use o MemoryRouter aqui */}
      <PokemonList pokemons={mockPokemons} />
    </MemoryRouter>
  );
});
