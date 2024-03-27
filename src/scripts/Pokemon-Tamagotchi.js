import React, { useState, useEffect } from 'react'
import { startGameClock } from './Game-Clock'
import { createNewPokemonTamagotchi } from './Pokemon-Functions'

export const StartGameInstance = (selectedPokemon) => {
  const [pokemonData, setPokemonData] = useState({});
  const [urlState, setUrlState] = useState(selectedPokemon.value)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${urlState}`)
    .then(resp => resp.json())
    .then(json => setPokemonData(json));
    startGameClock()
  }, [])

  //startGame(pokemonData.base_experience, pokemonData.stats[0].base_stat, pokemonData.sprites.other.showdown.front_default)
if(pokemonData.abilities === undefined){
  return <h1>Loading...</h1>
}


  return (
     <div className="gameContainer" id="TamagotchiContainer">
     <div id="gameClock">00:00</div>
    {/* <!-- need a container for the health bar--> */}
      <div className="barContainer">
    <div className="statusBars" id="healthBar">HP
          <p id="healthtxt">100/100</p>
          <progress id="health" value="100" max="100"></progress>
        </div>
        {/* <!-- need a container for the sleep bar--> */}
        <div className="statusBars" id="sleepBar">Energy
          <p id="sleeptxt">100/100</p>
          <progress id="sleep" value="100" max="100"></progress>
        </div>
        {/* <!-- need a container for the hunger bar--> */}
        <div className="statusBars" id="hungerBar">Hunger
          <p id="hungertxt">100/100</p>
          <progress id="hunger" value="100" max="100"></progress>
        </div>
      </div>
      {/* <!-- need a container for the animation--> */}
      <div id="animationBox">
        <img
        className="pokemon_Image"
        src={pokemonData.sprites.other.showdown.front_default}
        alt="Select a Pokemon" />
        <div id="expBox">
          <p className="lvlText" id="currentLevel">exp</p>
          <progress id="exp" value="0" max="10"></progress>
          <p className="lvlText" id="nextLevel"></p>
        </div>
      </div>
      <div id="button_container">
        <button id="feed" className="button" type="button">Feed</button>
        <button id="nap" className="button" type="button">Nap</button>
        <button id="longrest" className="button" type="button">Sleep</button>
        <button id="train" className="button" type="button">Train</button>
      </div>
      <button id="reset" className="button" type="button">Pick New Pokemon</button>
    </div>
  )
}