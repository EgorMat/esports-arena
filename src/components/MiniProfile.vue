<template>
  <div>

    {{currentUser.username}}
    {{currentUser.email}}
    {{currentUser.balance}}
    {{currentUser.id}}
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
