import {db} from '../../main.js';
import * as firebase from "firebase";

const state  = {
    games : [],
  };

const mutations = {
    SET_GAMES(state, games){
      state.games = games
    }
};

const getters  = {
  getGames(state){
    return state.games
  }
}


const actions = {
    setGames({commit, state}){
      firebase.auth().onAuthStateChanged(function(u) {
      if (u){
        const g = [];
        db.collection("games").get().then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
             g.push(doc.data());
         });
         commit('SET_GAMES', g)
     })
   }
 })}
}


export default {
  state,
  getters,
  mutations,
  actions
}
