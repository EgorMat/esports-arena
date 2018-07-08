
import {db} from '../../main.js';
import * as firebase from "firebase";

const state  = {
  username: '',
  email : '',
  id : '',
  balance : null,
  games : [],
};

const mutations = {
    SET_CURRENT_USER(state, user){
      state.email = user.email;
      state.id  = user.id;
      state.username = user.username;
      state.balance = user.balance;
      state.games = user.games;
    },
    DEBIT_BALANCE(state, money) {
      state.balance = state.balance - money
    },
    RETURN_FUNDS(state, money){
      state.balance = state.balance + money
    }
    // RESET_CURRENT_USER(state){
    //   state.email = '';
    //   state.id  = '';
    //   state.username = '';
    //   state.balance = null;
    //   state.games = [];
    // }

}

const getters = {
  getCurrentUser(state){
    return state
  }
}

const actions = {
    setCurrentUser({commit , state}){
      firebase.auth().onAuthStateChanged(function(u) {
      if (u){
     const user  = db.collection("users").where("id" ,"==", u.uid)
     user.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            commit('SET_CURRENT_USER', doc.data());;
          });
            })
                }
                  });

    },
    debitBalance({commit, state}, money){
        commit('DEBIT_BALANCE', money)
    },
    returnFunds({commit, state}, money){
      commit('RETURN_FUNDS', money)
    },

    updateProfile({state}){
      var x;
      const g = db.collection("users").where("id", "==", state.id).get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          return db.collection("users").doc(doc.id).update({
             balance: state.balance,
             games : state.games
         })
        })
      })
      console.log('ura')
    },
}

export default {
  state,
  getters,
  mutations,
  actions
}
