// css imports
import './pokemonDetails.css';

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonDetails() {
  const { id } = useParams();
  const POKEMON_DETAIL_URL = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemon, setPokemon] = useState(null);

  async function downloadPokemon() {
    try {
      const response = await axios.get(POKEMON_DETAIL_URL + id);
      const data = response.data;
      setPokemon({
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types,
        image: data.sprites.other.dream_world.front_default,
      });
    } catch (err) {
      console.error("Error fetching pokemon details:", err);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <>
      <h1 className='pokedex-redirect'>
        <Link to="/">Pokedex</Link>
      </h1>

      <div className='pokemon-details-wrapper'>
        <div className='pokemon-detail-name'>{pokemon.name}</div>

        <div className='pokemon-image'>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>

        <div className='pokemon-attr'>
          <div>Height: {pokemon.height}</div>
          <div>Weight: {pokemon.weight}</div>
        </div>

        <div className='pokemon-types'>
          <h3>Type:</h3>
          {pokemon.types.map((t) => (
            <span key={t.type.name}>{t.type.name} </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonDetails;
