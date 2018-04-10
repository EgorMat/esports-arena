<template>
  <div>
    <p>username: {{user.username}}</p>
    <p>email: {{user.email}}</p>
    <p>id: {{user.id}}</p>
    <p>баланс: {{user.balance}}</p>  
  </div>
</template>



<script>

import {mapGetters} from 'Vuex'

export default{
  computed:mapGetters({
    user : 'getCurrentUser'
  })
}


</script>
