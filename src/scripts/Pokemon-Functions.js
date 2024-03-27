import React, {useState, useEffect} from 'react'
import Pokemon from './Pokemon-Class'
import PokemonService from './Pokemon-Service'
import { randomPokemonSelector } from './Random-Pokemon-Selector'
import { StartGameInstance } from './Pokemon-Tamagotchi'

// import React from 'react'
// import Game_Clock from './Game-Clock'
// import Pokemon_Class from './Pokemon-Class'
// import Pokemon_Service from './Pokemon-Service'
// import Pokemon_Functions from './Pokemon-Functions'

//fetch list of pokemon, get their evolution chain link, check evolution chain link to see if base pokemon, if so add to list of pokemon available.



export default function PokemonFunctions () {
  const [listAllPokemon, setListAllPokemon] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState("")
  const [clickedState, setClickedState] = useState(false)

  useEffect(() => {
    let count = 1;
    const fetchPromises = [];
    while (count <= 78) {
      fetchPromises.push(fetch(`https://pokeapi.co/api/v2/evolution-chain/${count}`)
      .then(res => res.json()));
      count++;
    }
    Promise.all(fetchPromises).then(myPokemonArray => {
      setListAllPokemon(myPokemonArray);
      console.log(myPokemonArray);
    });
  }, []);

  if(listAllPokemon.length < 1){
    return <div>Loading...</div>
  }
  if(clickedState === false){
    return (
      <div className="start_Container">
        <label>Give your Pokemon a nickname</label>
        <input type="text" id="nickname" name="nickname" required/>
        <select id="pokemonSelector" name="Pokemon_selector">
          {listAllPokemon.map((pokemon, index) => {
            return (<option id={index} value={pokemon.chain.species.name}>{pokemon.chain.species.name}</option>)
          })}
        </select>
        <button id="randomButton" type="button" onClick={() => randomPokemonSelector()}>Pick for Me!</button>
        <button id="pokemonSelectorButton" type="button" onClick={() => setClickedState(true)}>Select Pokemon</button>
      </div>
    )
  } else{
    return (
      <>
        <h1>Hello World!</h1>
        <StartGameInstance value={document.getElementById("pokemonSelector").value} />
      </>
    )
  }
}
//Fixedd onclick works setting state
// :O




const pokemonSelectorButton = document.getElementById("pokemonSelectorButton")
const feedButton = document.getElementById("feed")
const napButton = document.getElementById("nap")
const sleepButton = document.getElementById("longrest")
const resetButton = document.getElementById("reset")
const startContainer = document.querySelector(".start_Container")
const gameContainer = document.querySelector(".gameContainer")
const pageHeader = document.querySelector("header")
const sleepPlus = document.getElementById("sleepBar")
const hungerPlus = document.getElementById("hungerBar")

let pokemonInstance1;
let pokemonInstance2;
let pokemonInstance3;

export async function createNewPokemonTamagotchi(enteredNickName, pokemon, baseXp, baseHp, imageUrl){
  if (pokemonInstance1 === undefined) {
  pokemonInstance1 = new Pokemon(enteredNickName, pokemon, baseXp, baseHp, imageUrl)
  } else if (pokemonInstance2 === undefined) {
    pokemonInstance2 = new Pokemon(enteredNickName, pokemon, baseXp, baseHp, imageUrl)
  } else if (pokemonInstance3 === undefined) {
      pokemonInstance3 = new Pokemon(enteredNickName, pokemon, baseXp, baseHp, imageUrl)
  } else {
      alert("Sorry, you may only have up to three pokemon active at a time.")
  }


  console.log(pokemonInstance1)
  document.getElementById("health").max = baseHp
  document.getElementById("health").value = baseHp
  document.getElementById("healthtxt").innerText = `${baseHp}/${baseHp}`

// const funimation = document.querySelector(".pokemon_Image")
// funimation.animate(
//   [
//     {transform: "translateY(0px)"},
//     {transform: "translateY(-10px)"},
//     {transform: "translateX(0px)"},
//     {transform: "translateX(-30px)"},
//   ],
//   {
//     duration: 10000,
//   iterations: 10,
//   }
// );
}
// pokemonSelectorButton.addEventListener("click", function(){
//   if (document.getElementById("nickname").value === ""){
//     alert("Please give your Pokemon a Nickname.");
//   }else {
//   createNewPokemonTamagotchi(document.getElementById("nickname").value )
//   }
// })
// feedButton.addEventListener("click", function(){pokemonInstance1.feedPokemon()})
// sleepButton.addEventListener("click", function(){pokemonInstance1.longSleepPokemon()})
// napButton.addEventListener("click", function(){pokemonInstance1.shortSleepPokemon()})
// resetButton.addEventListener("click", function(){window.reload()})


//timestamp function log into local function, pull timestamp each time