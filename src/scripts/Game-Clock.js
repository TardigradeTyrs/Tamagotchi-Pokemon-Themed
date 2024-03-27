import React from 'react'
// import PokemonClass from './Pokemon-Class'
// import PokemonService from './Pokemon-Service'
// import PokemonFunctions from './Pokemon-Functions'

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

let pokemonInstance1
// let pokemonInstance2
// let pokemonInstance3
// let pokemon
const speed = 20
let clockDiv = document.getElementById("gameClock")
let gameStartTime = 0;
let realStartTime = Date.now()
let multiplier;
let gameTime;

export function startGameClock() {
  timerId();
  gameTick()
}

function timerId() {
  gameTime = setInterval(function(){
    let gameTime = gameStartTime + (Date.now()-realStartTime) * speed;
    let sec = Math.floor(gameTime / 1000) % 60;
    let min = Math.floor(gameTime / 60000) % 60;
    let hour = Math.floor(gameTime / 3600000) % 24;
    clockDiv.textContent = `${hour}:${min}`.replace(/\b\d\b/g, "0$&");
}, 1000)
}


function gameTick(){
  let gameTickTime = setInterval(function(){
  passiveHPGain();
  pokemonInstance1.sleep -= 0.02;
  pokemonInstance1.hunger -= 0.05;
  if (pokemonInstance1.hunger <= 0){
    pokemonInstance1.hunger = 0;
    pokemonInstance1.currentHp -= 0.05
  }
  if (pokemonInstance1.sleep <= 0){
    pokemonInstance1.sleep = 0;
    pokemonInstance1.currentHp -= 0.025
  }

  if (pokemonInstance1.currentHp <= 0){
    // eslint-disable-next-line no-restricted-globals
    if(confirm("Sorry, but your Pokemon fainted. Take better care of the next one!")){
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }else{
    clearInterval(gameTickTime())
    clearInterval(gameTime)
    //funimation.pause();
  }
  }

  passiveXPGain();

  if (pokemonInstance1.grabCurrentXp > pokemonInstance1.grabXpNeeded){
    pokemonInstance1.levelPokemon()
    //levelUpStat();
  }
  /*/if (newTamagotchi.needsAttention == false && newTamagotchi.hunger === 0 || newTamagotchi.sleep === 0){
    window.alert("I NEED ATTENTION")
    newTamagotchi.needsAttention = true;
  }
  /*/

  document.getElementById("hunger").value = pokemonInstance1.hunger;
  document.getElementById("hungertxt").innerText = `${Math.floor(pokemonInstance1.hunger)}/${pokemonInstance1.hungerMax}`
  document.getElementById("sleep").value = pokemonInstance1.sleep;
  document.getElementById("sleeptxt").innerText = `${Math.floor(pokemonInstance1.sleep)}/${pokemonInstance1.sleepMax}`
  document.getElementById("health").value = pokemonInstance1.currentHp
  document.getElementById("healthtxt").innerText = `${Math.floor(pokemonInstance1.currentHp)}/${pokemonInstance1.hpMax}`
  document.getElementById("health").max = pokemonInstance1.hpMax;
  document.getElementById("exp").value = pokemonInstance1.grabCurrentXp;
  document.getElementById("exp").max = pokemonInstance1.grabXpNeeded;
  document.getElementById("currentLevel").innerText = `${pokemonInstance1.level}`
  document.getElementById("nextLevel").innerText = `${pokemonInstance1.level + 1}`
}, 10)}; //250 is default

const passiveXPGain = () => {
  if(pokemonInstance1.currentHp === pokemonInstance1.hpMax){
    if(pokemonInstance1.sleep > 70 && pokemonInstance1.hunger > 80){
        multiplier = 0.06
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep > 70 && pokemonInstance1.hunger > 60) {
        multiplier = 0.08
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep > 70  && pokemonInstance1.hunger > 20) {
        multiplier = 0.04
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep > 70 && pokemonInstance1.hunger <= 20){
        multiplier = 0.01
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep > 40 && pokemonInstance1.hunger > 80) {
        multiplier = 0.05
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep > 40 && pokemonInstance1.hunger > 60) {
        multiplier = 0.07
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep > 40 && pokemonInstance1.hunger > 20) {
        multiplier = 0.03
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep > 40 && pokemonInstance1.hunger <= 20) {
        multiplier = 0.002
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep >  10 && pokemonInstance1.hunger > 80) {
        multiplier = 0.006
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep >  10 && pokemonInstance1.hunger > 60) {
        multiplier = 0.004
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep >  10 && pokemonInstance1.hunger > 20) {
        multiplier = 0.002
        pokemonInstance1.addXpGained = multiplier
      } else if(pokemonInstance1.sleep >  10 && pokemonInstance1.hunger <= 20) {
        multiplier = 0.000
        pokemonInstance1.addXpGained = multiplier
      }else{}
    }
  }

const passiveHPGain = () => {
  if (pokemonInstance1.currentHp < pokemonInstance1.hpMax){
    pokemonInstance1.sleep -= 0.01;
    pokemonInstance1.hunger -= 0.025;
    if(pokemonInstance1.sleep > 70 && pokemonInstance1.hunger > 80){
      multiplier = 0.05
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep > 70 && pokemonInstance1.hunger > 60) {
      multiplier = 0.07
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep > 70  && pokemonInstance1.hunger > 20) {
      multiplier = 0.03
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep > 70 && pokemonInstance1.hunger <= 20){
      multiplier = 0.0005
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep > 40 && pokemonInstance1.hunger > 80) {
      multiplier = 0.04
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep > 40 && pokemonInstance1.hunger > 60) {
      multiplier = 0.06
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep > 40 && pokemonInstance1.hunger > 20) {
      multiplier = 0.02
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep > 40 && pokemonInstance1.hunger <= 20) {
      multiplier = 0.001
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep >  10 && pokemonInstance1.hunger > 80) {
      multiplier = 0.005
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep >  10 && pokemonInstance1.hunger > 60) {
      multiplier = 0.003
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    } else if(pokemonInstance1.sleep >  10 && pokemonInstance1.hunger > 20) {
      multiplier = 0.001
      pokemonInstance1.currentHp += pokemonInstance1.currentHp * multiplier
    }
  }
}

//Below was not working before transitioning to react
const levelUpStat = () => {
  sleepPlus.innerText = "Energy";
  hungerPlus.innerText = "Hunger";
  sleepPlus.style.fontStyle = "normal"
  hungerPlus.style.fontStyle = "normal"
  sleepPlus.addEventListener("click", function(){
    pokemonInstance1.sleepMax += 10;
    resetAfterLvlUp();
  })
  hungerPlus.addEventListener("click", function(){
    pokemonInstance1.hungerMax += 10;
    resetAfterLvlUp();
  })
}

const resetAfterLvlUp = () => {
  sleepPlus.innerText = "Energy";
  hungerPlus.innerText = "Hunger";
  sleepPlus.style.fontStyle = "normal"
  hungerPlus.style.fontStyle = "normal"
  sleepPlus.removeEventListener("click")
  hungerPlus.removeEventListener("click")
}
