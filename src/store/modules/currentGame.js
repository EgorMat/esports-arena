

function checkPlayer(game, user) {
  const t1 = game.team1;
  const t2 = game.team2;
  for(let i = 0; i<=t1.length-1; i++){
    if(t1[i] == user.username){
        console.log('yeah')
        return true;
    }
    else {
      return false;
    }
  };

  for(let k = 0; k<=t2.length-1; k++){
    if(t2[k] == user.username){
     return true;
    }
    else {
      return false;
    }
  }
}

const state = {
  id:' ',
  money : null,
  team1 : [],
  team2 : [],
  time: " ",
  isIn : null
};

const mutations = {
  SET_GAME(state, game){
    state.id = game.id;
    state.money = game.money;
    state.team1 = game.team1;
    state.team2 = game.team2;
    state.time  = game.time;
  },
  JOIN_TEAM1(state, payload){
    state.team1.push(payload)
    state.isIn = true;
  },
  JOIN_TEAM2(state, payload){
    state.team2.push(payload)
    state.isIn = true;
  },
  LEAVE_GAME(state, payload){
    let x;
    let z;
      for(let i = 0; i<=4; i++){
          if((state.team1[i] == payload) || (state.team2[i] == payload)){
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

}
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
  updateGame({state}){
    var x;
    const g = db.collection("games").where("id", "==", state.id).get()
    .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        return db.collection("games").doc(doc.id).update({
           team1 : state.team1,
           team2 : state.team2
       })
      })
    })
    console.log('ura')
  },
      };
