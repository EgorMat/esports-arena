<template>
<div>
<router-link :to="{path:'/dashboard'}">Турниры</router-link>
<!-- <router-link :to="{ name: 'my', params: {} }">Мои турниры</router-link> -->
<router-link :to="{ name: 'finance', params: {} }">Финансы</router-link>
</div>
</template>

<script>
export default{

}
</script>
