<template>
  <div>
    <ul class='tournaments-list'>
      <li v-for="game in games">
        <router-link :to="{name: 'tournament', params: {id: tournament.id}}">
        <div class='tournaments-list-item'>
          <p>ID: {{tournament.id}}</p>
          <p>Сумма : {{tournament.money}}</p>
          <p>Игроки: {{tournament.players}}</p>
        </div>
            </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed: mapState({
    games : state => state.games
  }),
    created(){
      this.$store.dispatch('getTournaments')
        }
      }

</script>


<style lang="scss" scoped>
@import '../style/tournaments-list.scss';
</style>
