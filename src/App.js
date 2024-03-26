import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchPokemonsFromAPI } from './services/pokemonServices';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import Pagination from './components/Pagination';
import Header from './components/Header';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(35); // Começa com 35 Pokémons por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonList = await fetchPokemonsFromAPI();
        setPokemons(pokemonList);
      } catch (error) {
        console.error('Error fetching Pokemons:', error);
      }
    };

    fetchData();

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 425) {
        setPokemonsPerPage(10); // Exibir 10 Pokémons por página em telas menores ou iguais a 425px
      } else {
        setPokemonsPerPage(35); // Exibir 35 Pokémons por página em telas maiores que 425px
      }
    };

    // Adiciona um listener de resize para atualizar a quantidade de Pokémons por página quando a tela for redimensionada
    window.addEventListener('resize', handleResize);

    // Remove o listener quando o componente é desmontado para evitar vazamentos de memória
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <PokemonList pokemons={currentPokemons} onSelectPokemon={setSelectedPokemonName} />
                <Pagination
                  pokemonsPerPage={pokemonsPerPage}
                  totalPokemons={pokemons.length}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            }
          />
          <Route
            path="/pokemon/:name"
            element={<PokemonDetails selectedPokemonName={selectedPokemonName} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
