let contenedor = document.querySelector(".container");

let pokemon = prompt("Ingrese el numero o nombre de pokemon deseado");
1;

const getPokemon = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const data = await response.json();
    // console.log(`${data.name} es de tipo ${data.types[0].type.name} y ${data.types[1].type.name}`)

    return data;
  } catch (error) {
    console.error(error);
  }
};

const templatePokemon = (pokemon) => {
  const { name, sprites, types, height, weight } = pokemon;
  const pokemonTypes = types.map((typeInfo) => typeInfo.type.name).join("-");
  const pokemonHTML = `
  <div class="card">
  <div class="titulo-card">
    <h2>${name}</h2>
  </div>
  <div class="image-container">
    <img src="${sprites.other.dream_world.front_default}" alt="${name}" />
  </div>
  <div class="card-info">
    <ul>
      <li>Altura: ${height / 10} mts</li>
      <li>Peso: ${weight / 10} kg</li>
      <li>Tipo: ${pokemonTypes}</li>
    </ul>
  </div>
  </div>
    `;
  contenedor.innerHTML += pokemonHTML;
};

const renderPokemon = async () => {
  try {
    const pokemon = await getPokemon();
    templatePokemon(pokemon);
  } catch (error) {
    console.error(error);
  }
};

renderPokemon();
