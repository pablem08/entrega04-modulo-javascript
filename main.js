const form = document.getElementById("form");
const pokeInput = document.querySelector(".search-input");
const cardContainer = document.querySelector(".container");
const searchMsg = document.querySelector(".search-msg");

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Funcion para renombrar la data de la api
const getPokemonData = (pokemon) => {
  return {
    pokemonName: capitalizeFirstLetter(pokemon.name),
    image: pokemon.sprites.other.dream_world.front_default,
    pokemonType: pokemon.types.map((typeInfo) => typeInfo.type.name).join("-"),
    pokemonHeight: pokemon.height / 10,
    pokemonWeight: pokemon.weight / 10,
  };
};

const createPokemonTemplateHTML = (pokemon) => {
  const { pokemonName, image, pokemonType, pokemonHeight, pokemonWeight } =
    getPokemonData(pokemon);

  return `
  <div class="card">
  <div class="titulo-card">
    <h2>${pokemonName}</h2>
  </div>
  <div class="image-container">
    <img src="${image}" alt="${pokemonName}" />
  </div>
  <div class="card-info">
    <ul>
      <li>Altura: ${pokemonHeight} mts</li>
      <li>Peso: ${pokemonWeight} kg</li>
      <li>Tipo: ${pokemonType}</li>
    </ul>
  </div>
  </div>
  `;
};

// Funcion para mostrarlo en el html
const renderPokemonCard = (pokemon) => {
  cardContainer.innerHTML = createPokemonTemplateHTML(pokemon);
};

// Funcion para cambiar el mensaje
const changeSearchMsg = (pokemon) => {
  const { pokemonName } = getPokemonData(pokemon);

  searchMsg.textContent = `Estas son las caracteristicas del pokemon ${pokemonName}, Queres ver otro pokemon?`;
};

const searchPokemon = async (e) => {
  e.preventDefault();
  const searchedPokemon = pokeInput.value.trim();

  if (searchedPokemon === "") {
    // alert("Ingresa una ciudad");
    searchMsg.textContent = "Por favor, ingrese el id de un pokemon";
    cardContainer.innerHTML = "";
    return;
  } else {
    if (searchedPokemon > 1025 || searchedPokemon < 1) {
      searchMsg.textContent = `El id ${searchedPokemon} no existe`;
      cardContainer.innerHTML = "";
    }
  }

  const fetchedPokemon = await requestPokemon(searchedPokemon);
  // console.log(fetchedPokemon.id)
  if (fetchedPokemon.id === undefined) {
    searchMsg.textContent = `El ${searchedPokemon} no existe`;
    cardContainer.innerHTML = "";
    form.reset();
    return;
  }

  renderPokemonCard(fetchedPokemon);
  changeSearchMsg(fetchedPokemon);
  form.reset();
};

const init = () => {
  form.addEventListener("submit", searchPokemon);
};

init();
