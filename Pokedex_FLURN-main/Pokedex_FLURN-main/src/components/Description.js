import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [pokemonId, setPokemonId] = useState(1); // Initial Pokemon ID
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}${pokemonId}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pokemonId]); // Fetch data on ID change

  const handleSearchChange = (event) => {
    setPokemonId(parseInt(event.target.value)); // Update ID on search
  };

  const renderPokemonData = () => {
    if (!pokemonData) {
      return <p>Loading...</p>;
    }

    const {
      name,
      height,
      weight,
      sprites: { front_default },
      types,
    } = pokemonData;
    const typeList = types.map((type) => type.type.name).join(", ");

    return (
      <div className="pokemon-card">
        <img src={front_default} alt={name} />
        <h1>{name}</h1>
        <p>Height: {height / 10} cm</p>
        <p>Weight: {weight / 10} kg</p>
        <p>Type: {typeList}</p>
        {/* Add sections for stats and moves here */}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <input
        type="number"
        onChange={handleSearchChange}
        value={pokemonId}
        disabled={isLoading} // Disable search input while loading
      />
      {renderPokemonData()}
    </div>
  );
}

export default App;
