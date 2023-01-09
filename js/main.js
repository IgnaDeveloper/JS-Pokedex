import darkTheme from "./tema_oscuro.js";

const d = document,
  $listaPokemon = d.querySelector("#listaPokemon"),
  $botonesHeader = d.querySelectorAll(".btn-header");

let j = 151;

let URL = "https://pokeapi.co/api/v2/pokemon/";
for (let i = 1; i <= j; i++) {
  fetch(`${URL}${i}`)
    .then((respuesta) => respuesta.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(data) {
  let tipos = data.types.map(
    (type) => `
  <p class="${type.type.name} tipo">${type.type.name}</p>
  `
  );
  tipos = tipos.join("");

  let pokeId = data.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  }
  if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const $div = d.createElement("div");
  $div.classList.add(`pokemon`);

  $div.innerHTML = `
            <div class="pokemon-imagen">
                <img src="${
                  data.sprites.other["official-artwork"].front_default
                }" alt="${data.name}"/>
            </div>
            <div class="pokemon-info">
              <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
              </div>
              <div class="pokemon-tipos">
                ${tipos}
              </div>
              <div class="pokemon-stats">
                <p class="stat altura">${data.height / 10}M</p>
                <p class="stat peso">${data.weight / 10}kg</p>
              </div>
            </div>
`;
  $listaPokemon.appendChild($div);
}

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-header")) {
    if (e.target.matches("#ver-todos")) {
      location.reload();
    } else {
    }
    $listaPokemon.innerHTML = "";
    const btnId = e.target.id;
    console.log(btnId);
    for (let i = 1; i <= j; i++) {
      fetch(`${URL}${i}`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
          const tipos = data.types.map((type) => type.type.name);
          if (tipos.some((tipo) => tipo.includes(btnId))) {
            mostrarPokemon(data);
          }
        });
    }
  }
});

d.addEventListener("keyup", (e) => {
  if (e.target.matches(".pokemon-filter")) {
    if (e.key == "Escape") {
      e.target.value = "";
    }
    d.querySelectorAll(".pokemon").forEach((el) => {
      el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ? el.classList.remove("filter")
        : el.classList.add("filter");
    });
  }
});

darkTheme(".dark-theme-btn", "bg-dark");
