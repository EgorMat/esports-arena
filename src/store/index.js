import  Vue from 'vue';
import Vuex from 'vuex';
import currentUser from './modules/currentUser.js'
import games from './modules/games.js'

Vue.use(Vuex);
 const store =  new Vuex.Store({
  modules: {
   currentUser,
   games
  },
  strict : true,
})


export default store;
