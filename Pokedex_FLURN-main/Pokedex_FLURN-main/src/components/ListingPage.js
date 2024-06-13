import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListingPage() {
  const [pokedata, setPokedata] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [output, setOutput] = useState(null);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0") // Limiting the number of Pokémon to fetch for better performance
      .then((response) => {
        setPokedata(response.data.results);

        // Fetch details for each Pokémon
        response.data.results.forEach((pokemon, index) => {
          axios
            .get(pokemon.url)
            .then((res) => {
              setPokemonDetails((prevDetails) => ({
                ...prevDetails,
                [index]: res.data,
              }));
            })
            .catch((err) => {
              console.error(`Failed to fetch details for ${pokemon.name}`, err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {pokedata.map((pokemon, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <p className="text-lg font-semibold">{pokemon.name}</p>
          {pokemonDetails[index] && (
            <img
              src={pokemonDetails[index].sprites.front_default}
              alt={pokemon.name}
              className="mx-auto"
            />
          )}
          <Link
            to="/newDetails"
            state={{ index: index }}
            className="block mt-2 text-blue-600 hover:underline"
          >
            Click here
          </Link>
        </div>
      ))}
    </div>
  );
}
