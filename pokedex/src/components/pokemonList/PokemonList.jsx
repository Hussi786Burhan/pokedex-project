import axios from "axios";
import "./PokemonList.css";
import { useEffect, useState } from "react";

function PokemonList() {
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    pokedexUrl: DEFAULT_URL,
    nextUrl: null,
    prevUrl: null,
  });

  async function downloadPokemons() {
    try {
      const response = await axios.get(pokemonListState.pokedexUrl);

      const pokemonResults = response.data.results; // array of pokemons

      // Save next & prev URLs
      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

      // Download each pokemon details
      const pokemonPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      const pokemonListData = await axios.all(pokemonPromise);

      const pokemonFinalList = pokemonListData.map((pokemonData) => {
        const pokemon = pokemonData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          types: pokemon.types.map((t) => t.type.name),
        };
      });

      // Update state with pokemon list
      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokemonFinalList,
      }));
    } catch (err) {
      console.error("Error downloading pokemons:", err);
    }
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <h1>Pokemon List</h1>

      <div className="page-controls">
        <button
          disabled={!pokemonListState.prevUrl}
          onClick={() =>
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: state.prevUrl,
            }))
          }
        >
          Prev
        </button>

        <button
          disabled={!pokemonListState.nextUrl}
          onClick={() =>
            setPokemonListState((state) => ({
              ...state,
              pokedexUrl: state.nextUrl,
            }))
          }
        >
          Next
        </button>
      </div>

      <div className="pokemon-list">
        {pokemonListState.pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>{pokemon.types.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
