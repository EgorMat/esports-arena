<template>
  <div>
    <div v-on:click='openMenu'>{{currentUser.username}}</div>
    <div v-show='menuOpened'>
      <ul>
      <li><router-link :to="{ name: 'profile'}">Профиль</router-link></li>
      <li>КУКУ</li>
    </ul>
    </div>
    Баланс:{{currentUser.balance}}
  </div>
</template>


<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default{
  data(){
    return{
      menuOpened : false
    }
  },
  computed: mapGetters({
    currentUser : 'getCurrentUser',
    }),
    created(){
      this.$store.dispatch('setCurrentUser');
    },
    methods:{
      openMenu(){
        this.menuOpened = this.menuOpened ? false : true
      }
    }

}
</script>
