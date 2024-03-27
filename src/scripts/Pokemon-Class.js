import React from 'react'
// import GameClock from './Game-Clock'
// import PokemonClass from './Pokemon-Class'
// import PokemonService from './Pokemon-Service'
// import PokemonFunctions from './Pokemon-Functions'

var healthBar = document.getElementById("health");
var healthText = document.getElementById("healthtxt");
var sleepBar = document.getElementById("sleep");
var sleepText = document.getElementById("sleeptxt");
var hungerBar = document.getElementById("hunger");
var hungerText = document.getElementById("hungertxt");
export default class Pokemon {
  #xpNeededToLevel
  #currentXp
  constructor(nickName, name, baseXp, baseHp, imageUrl) {
  this.name = name;
  this.nickName = nickName
  this.baseXp = baseXp;
  this.baseHp = baseHp;
  this.hpMax = baseHp;
  this.currentHp = baseHp;
  this.imageUrl = imageUrl;
  this.#currentXp = baseXp;
  this.#xpNeededToLevel = baseXp * 2 - (baseXp * .25)
  this.level = 4
  this.Indivdual_Value = Math.floor(Math.random()*31)
  this.sleep = 100
  this.sleepMax = 100
  this.hunger = 100
  this.hungerMax = 100
  this.needsAttention = false;
}
  get grabCurrentXp() {
    return this.#currentXp;
  }
  get grabXpNeeded() {
    return this.#xpNeededToLevel;
  }

  set addXpGained(XpGained) {
    this.#currentXp += XpGained

    //if (this.#xpNeededToLevel < this.#currentXp){
      //this.levelPokemon()
    //}
  }

  changeNickname(nickName) {
    this.name = nickName
  }
  levelPokemon() {
    this.level++;
    this.hpMax += Math.floor(0.01 * (2 * this.baseHp + this.Indivdual_Value *this.level)*this.level + 10);
    this.#xpNeededToLevel = this.#currentXp * 2 - (this.#currentXp * .25);
    this.currentHp = this.hpMax
    //this.#xpNeededToLevel = something from the chart
  }
  feedPokemon() {
    this.hunger += 30
    this.needsAttention = false;
    if (this.hunger > this.hungerMax) {
      this.hunger = this.hungerMax
    }
  }
  longSleepPokemon() {
    this.sleep = this.sleepMax;
    this.needsAttention = false
    this.hunger -= this.hungerMax * 0.35;
    if (this.sleep >= 100){
      this.sleep = 100
    }
    if (this.hunger <= 0) {
      this.hunger = 0;
      this.currentHp -= Math.floor(this.hpMax * 0.15)
    }

  }
  shortSleepPokemon() {
    this.sleep += this.sleepMax * 0.15;
    this.needsAttention = false;
    this.hunger -= this.hungerMax * 0.2;
    if (this.sleep >= 100){
      this.sleep = 100
    }
    if (this.hunger <= 0) {
      this.hunger = 0;
      this.currentHp -= Math.floor(this.hpMax * 0.15)
    }
  }
}