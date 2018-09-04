 <template>
<div class="preloader" v-if='isLoading'>Загрузка...</div>
<div class="tournament" v-else>
  <div class="modal-window" v-show='modal1Opened'>Вы уверены, что хотите снять с вашего баланса {{game.money}}р. и зайти за 1 команду?
    <button class='ok-button' @click ='joinTeam1'>ОК</button>
  </div>
  <div class="modal-window" v-show='modal2Opened'>Вы уверены, что хотите снять с вашего баланса {{game.money}}р. и зайти за 2 команду?
    <button class='ok-button' @click ='joinTeam2'>ОК</button>
  </div>
  <div class="modal-window" v-show='modal3Opened'>{{game.money}}р. будут возвращены на Ваш баланс
    <button class='ok-button' @click ='leaveGame'>ОК</button>
  </div>
 <div class="modal-window" v-show='modal4Opened'>К сожалению, мест в этой команде нет
 </div>

  <div class='fader' v-show ='showFader' @click='closeModals'></div>
  <p>ID турнира: {{game.id}}</p>
  <p>Сумма: {{game.money}}</p>
  <p>Мод: {{game.mode}}</p>
  <p>Дата: {{game.time}}</p>
  <p> {{game.playersInTeam}} vs {{game.playersInTeam}} <p>
  <div>Силы Света:
    <ul>
      <li v-for="players in game.team1">
        {{players}}
      </li>
    </ul>
  </div>
  <div>Силы Тьмы:
    <ul>
      <li v-for="players in game.team2">
        {{players}}
      </li>
    </ul>
  </div>
  <button v-on:click='showModal1' v-if='!isIn' key="team1">Присоединиться к Силам Света</button>
  <button v-on:click='showModal2' v-if='!isIn' key="team2">Присоединиться к Силам Тьмы</button>
  <button v-on:click='showModal3' v-if='isIn'>Покинуть турнир</button>

</div>
</template>



 <script>
import {mapGetters} from 'vuex'
import {db} from '../main.js';
import * as firestore from "firebase/firestore"
import * as firebase from "firebase";

export default{
  data(){
    return{
      game : {},
      isIn: false,
      isLoading : true,
      modal1Opened : false,
      modal2Opened : false,
      modal3Opened : false,
      modal4Opened: false,
      showFader  : false
      }
    },

  created(){
   this.getGame(this.$route.params.id).then(() => {
      this.checkPlayer()
   })
  // setTimeout(()=>this.checkPlayer(), 2000); /// переделать в промисы
  },

  computed: mapGetters({
    user : 'getCurrentUser'
  }),

  methods: {
    showModal1(){
      if (this.game.team1.length <= this.game.playersInTeam-1) {
          this.modal1Opened = true;
          this.showFader = true;}
      else {
          this.showModal4()
      }
    },

    showModal2() {
      if (this.game.team2.length <= this.game.playersInTeam-1) {
      this.modal2Opened = true;
      this.showFader = true;}
      else {
          this.showModal4()
      }
    },

    showModal3(){
      this.modal3Opened = true;
      this.showFader = true;
    },

    showModal4(){
      this.modal4Opened = true;
      this.showFader = true;
    },

    closeModals(){
      this.modal1Opened = false;
      this.modal2Opened = false;
      this.modal3Opened = false;
      this.modal4Opened = false;
      this.showFader = false;
    },

    joinTeam1(){
      if (this.user.balance >= this.game.money){
      this.game.team1.push(this.user.username);
      this.updateGame();
      this.isIn = true;
      this.$store.dispatch('addNewGame', this.game.id).then(
      this.$store.dispatch('debitBalance', this.game.money).then(this.$store.dispatch('updateProfile')))
      this.closeModals()
      }
        else {
          alert('у вас не хватает денег')
        }
    },

    joinTeam2(){
      if (this.user.balance >= this.game.money){
      this.game.team2.push(this.user.username);
      this.updateGame();
      this.isIn = true;
        this.$store.dispatch('addNewGame', this.game.id).then(
            this.$store.dispatch('debitBalance', this.game.money).then(this.$store.dispatch('updateProfile')))
            }
        else {
            alert('у вас не хватает денег')

      }
      this.closeModals()
    },
    leaveGame(){
        let x;
        let z;
          for(let i = 0; i<=4; i++){
              if (this.game.team1[i] === this.user.username){
                  z = this.game.team1[i];
                  let y  = this.game.team1.indexOf(z);
                  this.game.team1.splice(y,1);
                  this.updateGame();
                  this.isIn = false;
                  this.$store.dispatch('removeGame', this.game.id)
                  this.$store.dispatch('returnFunds', this.game.money).then(this.$store.dispatch('updateProfile'))
              }
            }
            for(let i = 0; i<=4; i++){
                if (this.game.team2[i] === this.user.username){
                    x = this.game.team2[i];
                    let k  = this.game.team2.indexOf(x);
                    this.game.team2.splice(k,1);
                    this.updateGame();
                    this.isIn = false;
                    this.$store.dispatch('removeGame', this.game.id)
                    this.$store.dispatch('returnFunds', this.game.money).then(this.$store.dispatch('updateProfile'))
                }
              }
              this.closeModals()
    },

    checkPlayer(){
      let t1 = this.game.team1;
      let t2 = this.game.team2;
          console.log(this.game.team1)
          for(let i = 0; i<=t1.length-1; i++){
            if(t1[i] == this.user.username){
                this.isIn = true;

            }
          };
          for(let k = 0; k<=t2.length-1; k++){
            if(t2[k] == this.user.username){
            this.isIn = true;
            }
          }
        this.isLoading = false;
        },

    getGame(id){
      return new Promise((resolve, reject) => {
      var $this = this
      firebase.auth().onAuthStateChanged(function(u) {
      if (u){
        const g = db.collection("games").where("id", "==", id)
          g.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
             $this.game = doc.data()});
             if ($this.game){
               resolve($this.game)
             }
             else {
               reject("Pizdets")
             }
        })}
        console.log($this.game)
        })

      })
    },
    updateGame(){
      var x;
      var $this = this;
      const g = db.collection("games").where("id", "==", $this.game.id).get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          return db.collection("games").doc(doc.id).update({
             team1 : $this.game.team1,
             team2 : $this.game.team2
         })
        })
      })
      console.log('document updated');
    }
 }
}
 </script>


 <style lang='scss' scoped>
 @import '../style/tournament.scss';
 </style>
