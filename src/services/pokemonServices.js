export const fetchPokemonsFromAPI = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151');
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemons');
      }
      const data = await response.json();
      const pokemonList = data.results.map((pokemon, index) => ({
        name: (pokemon.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }));
      return pokemonList;
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
      throw error;
    }
  };
  
 /* const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };*/
  