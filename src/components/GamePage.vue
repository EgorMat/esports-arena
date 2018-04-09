<template>
<div class="tournament">
  <p>ID турнира: {{game.id}}</p>
  <p>Сумма: {{game.money}}</p>
  <div>Команда 1:
    <ul>
      <li v-for="players in game.team1">
        {{players}}
      </li>
    </ul>
  </div>
  <div>Команда 2:
    <ul>
      <li v-for="players in game.team2">
        {{players}}
      </li>
    </ul>
  </div>
  <!-- <button v-on:click='joinTournament' v-if='!isIn'>Присоединиться к турниру</button>
  <button v-on:click='leaveTournament' v-if='isIn'>Покинуть турнир</button> -->
</div>
</template>



<script>
import {mapGetters} from 'vuex'

export default{
  created(){
    this.$store.dispatch('setGame', this.$route.params.id);
  },
  computed:mapGetters({
    game : 'getGame'
  }),
 watch:{
   'this.$route.params.id' : 'getGame'
 }

 }

</script>


<style lang='scss' scoped>
 @import '../style/tournament.scss';
</style>
