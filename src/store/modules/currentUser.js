
import {db} from '../../main.js';
import * as firebase from "firebase";

const state  = {
  username: '',
  email : '',
  id : '',
  balance : '',
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
        } else {
      this.$router.push('home')
  }
});

    }
}

export default {
  state,
  getters,
  mutations,
  actions
}
