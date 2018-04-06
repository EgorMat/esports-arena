<template>
<div>
  <header class ='header'>
    <button class='button' v-on:click ="openLogWindow">Войти</button>
    <button class='button' v-on:click ="openRegWindow">Региcтрация</button>
  </header>
  <div class="fade" v-show='fadeWindowOpened' v-on:click="closeWindows"></div>
  <login-window v-show="loginWindowOpened"/>
  <reg-window v-show="regWindowOpened"/>
</div>
</template>


<script>
import {mapActions, mapState} from 'vuex';
import LoginWindow from './LoginWindow';
import RegWindow from './RegWindow';
export default {
    data(){
      return {loginWindowOpened: false,
              regWindowOpened : false,
              fadeWindowOpened : false
      }
    },
    methods: {
      openLogWindow(){
        this.loginWindowOpened =  this.loginWindowOpened ? false : true;
        this.fadeWindowOpened =  this.fadeWindowOpened ? false : true;
                    },
      openRegWindow(){
        this.regWindowOpened =  this.regWindowOpened ? false : true;
        this.fadeWindowOpened =  this.fadeWindowOpened ? false : true;
      },
      closeWindows(){
        if (this.regWindowOpened == true || this.loginWindowOpened == true){
            this.regWindowOpened = false;
             this.loginWindowOpened = false;
             this.fadeWindowOpened = false;
        }
      }

    },
  components: {
    LoginWindow,
    RegWindow
  }
}
</script>


<style lang="scss" scoped>
@import '../style/header.scss';
</style>
