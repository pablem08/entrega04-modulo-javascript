// URL
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const requestPokemon = async (pokemon) => {
  try {
    const response = await fetch(
      `${BASE_URL}${pokemon}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Hubo un error en la petition: ${error}`);
  }
};