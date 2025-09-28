//css imports
import PokemonList from '../pokemonList/PokemonList';
import search from '../Search/Search';
import './pokedex.css';

function pokedex() {
    return (

        <div className='pokedex-wrapper'>
              <h1> POKEMON</h1>
                 <search/>
                 <PokemonList />
        </div>
      )
}
export default pokedex;