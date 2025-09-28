// css imports
import './search.css';

function Search() {
  return (
    <div className="search-wrapper">
      <input
        id="search-pokemon"
        type="text"
        placeholder="Which Pokémon are you looking for?"
      />
    </div>
  );
}

export default Search;
