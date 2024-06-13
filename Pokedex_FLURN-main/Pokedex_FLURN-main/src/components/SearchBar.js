import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Loader from "./Loader";
import pokedex from "../Assests/Pokedex.png.webp";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`)
      .then((response) => {
        setOutput(response.data);
        console.log(response.data);
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((err) => {
        setOutput(null);
        if (err.response && err.response.status === 404) {
          setErrorMessage("Invalid Pokemon");
        } else {
          setErrorMessage("An error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <img src={pokedex} alt="Pokedex" className="pokedex-img" />
        <input
          type="search"
          placeholder="Type to search ..."
          value={input}
          onChange={handleChange}
          className="search-input"
        />
        <FaSearch
          id="search-icon"
          onClick={fetchData}
          className="search-icon"
        />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {loading && <Loader />}
      {output && (
        <div>
          <h3>{output.name}</h3>
          <img src={output.sprites.front_default} alt={output.name} />
          <Link to="/getFullDetails" state={{ output: output }}>
            Click here to know Full Details
          </Link>
        </div>
      )}
    </div>
  );
}
