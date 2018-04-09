<template>
 <div id ="app">
  <router-view></router-view>
  </div>
</template>


<script>
import {mapActions, mapState} from 'vuex';
import HomePage from './HomePage';
import Dashboard from './Dashboard'
import GamesList from './GamesList'
import GamePage from './GamePage'

export default {
  components: {
    HomePage,
    Dashboard,
    GamesList,
    GamePage,
  },
}
</script>


<style lang="scss" scoped>
@import '../style/app.scss';
</style>
