import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/pokemonDetailStyles.css';
import ProfessorImage from '../assets/oak_professor.png';
import Button from './Button';

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!name) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon details');
        }
        const data = await response.json();

        // Ajuste dos nomes, habilidades e tipos
        const adjustedPokemon = {
          ...data,
          name: capitalizeFirstLetter(data.name),
          abilities: data.abilities.map((ability) => ({
            ability: { name: capitalizeFirstLetter(ability.ability.name) }
          })),
          types: data.types.map((type) => ({
            type: { name: capitalizeFirstLetter(type.type.name) }
          }))
        };

        setPokemon(adjustedPokemon);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }

  return (
    <div className="detailsContainer">
      <div className="pokemonDetails">
        <h2>Detalhes do Pokémon</h2>
        <p>Name: {pokemon.name}</p>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
        <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
        <p>Stats:</p>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
          ))}
        </ul>
      </div>
      <img className="professorImg" src={ProfessorImage} alt="Oak Professor" />
      <div className="footer">
        <Button to="/">Voltar</Button>
      </div>
    </div>
  );
};

export default PokemonDetails;
