<template>
<div>
  СОздавай игру
  <form>
    <button @click='createGame'>Создать игру</button>
    <input type="number" placeholder="Сумма" v-model="money">
    <select v-model='mode'>
      <option disabled>Выбор мода</option>
      <option>Captains mode</option>
      <option>All pick</option>
    </select>
  </form>
  <button>Пригласить игроков</button>
 Мод : {{mode}}
 Бабло: {{money}}
</div>
</template>


<script>
export default{
  data(){
    return{
    mode: ' ',
    money: ' '
  }
},

  methods:{
    createGame(){

    }
  }



}

</script>
