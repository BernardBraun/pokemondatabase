import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pokemonListStyles.css';

const PokemonList = ({ pokemons }) => {
  return (
    <div className='container'>
      <h2>Banco de dados Pokémon</h2>
      <ul className='pokemonList'>
        {pokemons?.map((pokemon) => (
          <li key={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} className="pokemonContainer"> 
            <Link to={`/pokemon/${pokemon.name}`} className='pokemonBox'>
              <img src={pokemon.image} alt={pokemon.name} className='pokemonImage'/>
              <p>{pokemon.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
