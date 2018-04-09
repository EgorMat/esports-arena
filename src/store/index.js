import  Vue from 'vue';
import Vuex from 'vuex';
import currentUser from './modules/currentUser.js'
import games from './modules/games.js'
import currentGame from './modules/currentGame.js'

Vue.use(Vuex);
 const store =  new Vuex.Store({
  modules: {
   currentUser,
   games,
   currentGame
  },
  strict : true,
})


export default store;
