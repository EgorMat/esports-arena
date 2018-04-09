<template>
<div class='reg-window modal-window'>
  <form>
    <input v-model="email" placeholder="Введи email" required>
    <input v-model="username" placeholder="Введи username" required>
    <input v-model="password" type='password' placeholder="Введи password" required>
    <button v-on:click="onSubmit">Зарегистрироваться</button>
  </form>
</div>
</template>


<script>
import {db} from '../main.js';
import * as firebase from "firebase";

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(((user) => {
            db.collection("users").doc('user' + this.username.toString()).set({
                id : user.uid,
                username: this.username,
                email: this.email,
                balance: 0,
                games: []
              })
              .then(function() {
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });

            this.$router.push('/dashboard')
          }),
          function(error) {
            // alert('Неправильно')
            console.log(error)
          });

    }
  }
}
</script>



<style lang="scss" scoped>
@import '../style/form.scss';
</style>
