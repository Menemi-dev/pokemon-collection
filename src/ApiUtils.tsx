const pokemonList = () => {
  const total_pokemons = 1017
  const ids = Array( total_pokemons ).fill(0).map((_, index) => index + 1);
  ids.sort(() => Math.random() - 0.5);
  return ids;
}

const capitalize = ( str ) => {
  if( typeof str === 'string' || str instanceof String ) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return '';
};

export { pokemonList, capitalize };
