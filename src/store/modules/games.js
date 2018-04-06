import axios from 'axios';

const state  = {
games : [],
  };

const mutations = {
    GET_TOURNAMENTS(state, tournaments){
    state.tournaments = tournaments
    },
  // JOIN_TOURNAMENT(state, tournamentId){
  // let a = getters.getTournamentById(tournamentId)
  // a.players.push(this.state.currentUser.id)
  // }
};

// const getters  = {
//   getTournamentById(state, id){
//     let x;
//     for (let i = 0; i<=state.tournaments.length-1;i++){
//          if(state.tournaments[i].id == id){
//            x = state.tournaments[i];
//          }
//          return x;
//   }
// }};


const actions = {
    // getTournaments({commit}){
    //   axios.get('http://localhost:3004/tournaments/')
    //   .then(response => {
    //     commit('GET_TOURNAMENTS', response.data)
    //   });
    // },
    joinTournament({commit}, tournamentId){
      commit('JOIN_TOURNAMENT', tournamentId);
    }
}


export default {
  state,
  mutations,
  actions
}
