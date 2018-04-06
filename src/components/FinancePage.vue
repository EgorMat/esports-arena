<template>
  <div>
 Ваш баланс: {{balance}}
</div>
</template>

<script>
export default{
    data(){
      return{
      balance: this.$store.state.currentUser.balance
    }
    }
}
</script>
