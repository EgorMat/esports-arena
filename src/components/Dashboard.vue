<template>
<div>
<header class="header">
    <mini-profile/>
    <navigation-bar></navigation-bar>
</header>
<main>
  <router-view></router-view>
</main>
</div>
</template>


<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import MiniProfile from './MiniProfile.vue'
import GamesList from './GamesList.vue'
import GamePage from './GamePage.vue'
import NavigationBar from './NavigationBar.vue'
export default {
    methods: {

    },
    components: {
      MiniProfile,
      NavigationBar,
      GamesList,
      GamePage
    }
}
</script>

<style lang="scss" scoped>
@import '../style/header.scss';
</style>
