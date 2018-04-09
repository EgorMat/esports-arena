<template>
  <div>
    {{currentUser.username}}
    Баланс:{{currentUser.balance}}
  </div>
</template>


<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default{
  computed: mapGetters({
    currentUser : 'getCurrentUser',
    }),
    created(){
      this.$store.dispatch('setCurrentUser');
    }
}
</script>
