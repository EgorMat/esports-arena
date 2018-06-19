<template>
  <div class='login-window modal-window'>
    <form>
    <input v-model="username" placeholder="Введи username">
    <input v-model="email" placeholder="Введи email">
    <input v-model="password" type='password' placeholder="Введи password">
    <label>Запомнить меня <input v-model='rememberMe' type='checkbox'> </label>
    <button v-on:click="onSubmit">Нажми</button>
  </form>
  </div>
</template>


<script>
import * as firebase from "firebase";

export default{
  data(){
    return{
      username : '',
      password : '',
      email:'',
      rememberMe : false
    }
  },
  methods: {
    onSubmit(e){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(((user)=>
        this.$router.push('/dashboard')
      ),
      function(error){
        alert('Неправильно')
      })
            }
          }
}
</script>



<style lang="scss" scoped>
@import '../style/form.scss';
</style>
``
