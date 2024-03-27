

export const randomPokemonSelector = () => {
  let selector = document.getElementById("pokemonSelector");
  let selectedId = Math.floor(Math.random()*79)
  selector.selectedIndex = selectedId
}