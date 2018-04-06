<template>
 <div id ="app">
  <router-view></router-view>
  </div>
</template>


<script>
import {mapActions, mapState} from 'vuex';
import HomePage from './HomePage';
import Dashboard from './Dashboard'
export default {
  components: {
    HomePage,
    Dashboard
  },
}
</script>


<style lang="scss" scoped>
@import '../style/app.scss';
</style>
