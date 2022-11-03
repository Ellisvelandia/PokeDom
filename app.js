const getRandomPokemon = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener("DOMContentLoaded", () => {
  const randomPokemon1 = getRandomPokemon(1, 451);
  const randomPokemon2 = getRandomPokemon(1, 451);
  const randomPokemon3 = getRandomPokemon(1, 451);
  fecthData(randomPokemon1);
  fecthData(randomPokemon2);
  fecthData(randomPokemon3);
});

const fecthData = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    console.log(data);
    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      name: data.name,
      hp: data.stats[0].base_stat,
      experience: data.base_experience,
      attack: data.stats[1].base_stat,
      special: data.stats[3].base_stat,
      defense: data.stats[2].base_stat,
    };
    renderCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const renderCard = (pokemon) => {
  const flex = document.querySelector(".flex");
  const template = document.querySelector("#template-card").content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone.querySelector(".card-body-img").setAttribute("src", pokemon.img);
  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${pokemon.name} <span> hp ${pokemon.hp}</span>`;
  clone.querySelector(".card-body-text").textContent =
    pokemon.experience + " exp";
  clone.querySelectorAll(".card-footer-social h3")[0].textContent =
    pokemon.attack + "K";
  clone.querySelectorAll(".card-footer-social h3")[1].textContent =
    pokemon.special + "K";
  clone.querySelectorAll(".card-footer-social h3")[2].textContent =
    pokemon.defense + "K";
  fragment.appendChild(clone);
  flex.appendChild(fragment);
};
