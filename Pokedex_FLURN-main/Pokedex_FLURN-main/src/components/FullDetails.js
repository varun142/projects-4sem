import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function FullDetails() {
  const location = useLocation();
  const output = location.state.output;
  const [speciesData, setSpeciesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${output.id}`)
      .then((response) => {
        setSpeciesData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [output.id]);

  const getEnglishDescription = () => {
    if (speciesData) {
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      return englishEntry
        ? englishEntry.flavor_text
        : "No description available.";
    }
    return "Loading description...";
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 font-sans">
      <div className="p-4 bg-white">
        <p className="text-2xl font-semibold">{output.name}</p>
        <img
          src={output.sprites.front_default}
          alt={output.name}
          className="mx-auto mb-4 w-48 h-48 object-contain"
        />
        <p>ID: {output.id}</p>
        <p>{getEnglishDescription()}</p>
        <p>Base Happiness: {speciesData.base_happiness}</p>
        <p>Capture Rate: {speciesData.capture_rate}</p>
        <h1 className="text-xl font-semibold">Egg Group:</h1>
        {speciesData.egg_groups.map((eggGroup, index) => (
          <p key={index}>{eggGroup.name}</p>
        ))}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-semibold">Abilities:</h3>
        {output.abilities.map((ab, index) => (
          <p key={index}>{ab.ability.name}</p>
        ))}
        <h1 className="text-xl font-semibold">Moves:</h1>
        {output.moves.map((mo, index) => (
          <p key={index}>{mo.move.name}</p>
        ))}
      </div>
    </div>
  );
}
