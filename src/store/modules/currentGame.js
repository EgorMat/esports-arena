import {db} from '../../main.js';
import * as firebase from "firebase";

const state = {
currentGame:{
  id:'',
  money : null,
  team1:[],
  team2:[],
  time:""
}
};

const mutations = {
  SET_GAME(state, game){
    state.currentGame.id = game.id;
      state.currentGame.money = game.money;
      state.currentGame.team1 = game.team1;
    state.currentGame.team2 = game.team2;
      state.currentGame.time  = game.time;
  },
  JOIN_GAME(state){

  },
  LEAVE_GAME(state){

  }
};

const actions = {
  setGame({commit, state}, id){
    firebase.auth().onAuthStateChanged(function(u) {
    if (u){
      const g = db.collection("games").where("id", "==", id)
        g.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            commit('SET_GAME', doc.data())
       });
   })
   }
    })
      }
      };

const getters = {
  getGame(state){
    return state.currentGame;
  }
}

export default{
  state,
  actions,
  getters,
  mutations
}
