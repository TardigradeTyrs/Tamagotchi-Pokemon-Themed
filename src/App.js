import './App.css';
import React from 'react'
import GameClock from './scripts/Game-Clock'
import PokemonClass from './scripts/Pokemon-Class'
import PokemonService from './scripts/Pokemon-Service'
import PokemonFunctions from './scripts/Pokemon-Functions'

function App() {
  return (
    <div>
      <header>
        <h1>Welcome to
          <img className="headImg" id="pokemon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png"/>
          <img className="headImg" id="tamagotchiLogo" src="https://upload.wikimedia.org/wikipedia/de/thumb/d/d7/Tamagotchi-logo.svg/512px-Tamagotchi-logo.svg.png?20110501153553"/>
        </h1>
        <p>Who will you choose?</p>
      </header>
        <PokemonFunctions />
    </div>
  );
}

export default App;
