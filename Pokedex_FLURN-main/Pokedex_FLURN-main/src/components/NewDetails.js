import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function NewDetails() {
  const location = useLocation();
  const [speciesData, setSpeciesData] = useState(null);
  const [output, setOutput] = useState(null);
  const [loadingSpecies, setLoadingSpecies] = useState(true);
  const [loadingOutput, setLoadingOutput] = useState(true);
  const [error, setError] = useState(null);
  const index = location.state.index;

  useEffect(() => {
    setLoadingSpecies(true);
    setLoadingOutput(true);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${index + 1}`)
      .then((response) => {
        setSpeciesData(response.data);
        setLoadingSpecies(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingSpecies(false);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
      .then((response) => {
        setOutput(response.data);
        setLoadingOutput(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingOutput(false);
      });
  }, [index]);

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

  if (loadingSpecies || loadingOutput) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        {output && (
          <>
            <p className="text-2xl font-semibold mb-4">{output.name}</p>
            <img
              src={output.sprites.front_default}
              alt={output.name}
              className="mx-auto mb-4 w-48 h-48"
            />
            <p>ID: {output.id}</p>
            <p>{getEnglishDescription()}</p>
            <p>Base Happiness: {speciesData.base_happiness}</p>
            <p>Capture Rate: {speciesData.capture_rate}</p>
            <h1 className="text-lg font-semibold mt-4">Egg Group:</h1>
            {speciesData.egg_groups.map((eggGroup, index) => (
              <p key={index}>{eggGroup.name}</p>
            ))}
          </>
        )}
      </div>
      <div>
        {output && (
          <>
            <h3 className="text-lg font-semibold mt-4">Abilities:</h3>
            {output.abilities.map((ab, index) => (
              <p key={index}>{ab.ability.name}</p>
            ))}
            <h1 className="text-lg font-semibold mt-4">Moves:</h1>
            {output.moves.map((mo, index) => (
              <p key={index}>{mo.move.name}</p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
