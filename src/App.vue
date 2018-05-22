<template>
  <div id="app">
    <router-link to="/">Главное меню</router-link>
    <router-link to="/exerclist">Список заданий</router-link>
    <router-link to="/test/2424267">Задание</router-link>
    <router-link to="/settings/2424267">Настройки</router-link>
    <router-view/>
  </div>
</template>

<script>
import store from "@/store"
export default {
  name: 'App',
  async created(){
    let res = await store.dispatch("loadExercises",{local:true});
    // if(res) alert("loaded");
    // else {}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 60px;
}
</style>
