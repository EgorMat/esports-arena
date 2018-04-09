import {db} from '../../main.js';
import * as firestore from "firebase/firestore"
import * as firebase from "firebase";



const state = {
  id:'',
  money : null,
  team1:[],
  team2:[],
  time:""

};

const mutations = {
  SET_GAME(state, game){
    state.id = game.id;
    state.money = game.money;
    state.team1 = game.team1;
    state.team2 = game.team2;
    state.time  = game.time;
  },
  JOIN_TEAM1(state,payload){
    state.team1.push(payload)
  },
  JOIN_TEAM2(state,payload){
    state.team2.push(payload)
  },
  LEAVE_GAME(state, payload){
    let x;
    let z;
      for(let i = 0; i<=4; i++){
          if((state.team1[i] == payload) ||(state.team2[i] == payload)){
            x = state.team1[i];
            z = state.team2[i]; }}
              if(x==undefined){
                let y = state.team2.indexOf(z);
                state.team2.splice(y,1);
              }
              else{
                 let y = state.team1.indexOf(x);
                 state.team1.splice(y,1);
               }
  }
};

const actions = {
  setGame({commit, state}, id){
    firebase.auth().onAuthStateChanged(function(u) {
    if (u){
      const g = db.collection("games").where("id", "==", id)
        g.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            commit('SET_GAME', doc.data())});
      })}})
  },
  joinTeam1({commit, state}, payload){
      commit('JOIN_TEAM1', payload)
                                      },
  joinTeam2({commit, state}, payload){
        commit('JOIN_TEAM2', payload)
                                      },
  leaveGame({commit,state}, payload){
      commit('LEAVE_GAME', payload)
  },
  updateGame({state}){
    console.log(state.id)
    const g = db.collection("games").where("id", "==", state.id);
      g.update({
        team1 : state.team1,
        team2 : state.team2,
        balance : state.balance
    })
    .then(function() {
    console.log("Document successfully updated!");
})
  }


      };

const getters = {
  getGame(state){
    return state;
  }
}

export default{
  state,
  actions,
  getters,
  mutations
}
