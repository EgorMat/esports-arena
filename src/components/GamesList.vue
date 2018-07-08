<template>
<div>
  <ul class='tournaments-list'>
    <li v-for="game in games">
      <router-link :to="{name: 'game', params: {id: game.id}}">
        <div class='tournaments-list-item'>
          <p>ID: {{game.id}}</p>
          <p>Время: {{game.time}}</p>
          <p>Сумма : {{game.money}}</p>
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
        </div>
      </router-link>
    </li>
  </ul>
  <router-link :to="{name: 'creategame'}">
     Создать игру
  </router-link>
</div>

</template>

<script>
import {mapState,mapGetters} from 'vuex';

export default {
  computed: mapGetters({
    games: 'getGames'
  }),
  created() {
    this.$store.dispatch('setGames')
  },


}
</script>


<style lang="scss" scoped>
@import '../style/tournaments-list.scss';
</style>
