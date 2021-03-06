import React, { useState, useEfect, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./services/pokemon";
import Card from "./components/Card/Card";
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);
  const [prevUrl, setPrevUrl] = useState([]);
  const [loading, setLoading] = useState([]);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl); // getAllPokemon -> Handles the fetching of the api data
      setNextUrl(response.next); // 'next' in 'response.next' is one of the url endpoints in the pokemon api
      setPrevUrl(response.previous); // 'next' in 'response.next' is one of the url endpoints in the pokemon api
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
