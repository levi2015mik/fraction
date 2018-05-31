<template>
  <div id="app">
    <nav>
      <router-link to="/">Главное меню</router-link>
      <router-link to="/statistic">Статистика</router-link>
    </nav>

    <router-view/>
    <footer>
      version 0.0.2<br/>
      &copy; Michael Levitsky
    </footer>
  </div>
</template>

<script>
import store from "@/store"
export default {
  name: 'App',
  /**
   * Загрузка данных приложения: упражнения и статистика
   * @returns {Promise<void>}
   */
  async created(){
    let res = await store.dispatch("loadExercises",{local:true});
    // if(res) alert("loaded");
    // else {}
    let stat = await store.dispatch("loadStatistic",{local:true});
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
html body{
  background: #f5f5f5;
}
nav{
  /*margin:0.6em;*/
  margin-top: 2em;
  margin-left: 4em;
  font-size: 1.3em;
}
nav a{
  padding-right: 0.5em;
}
a{
  color: #00C;
}
a:hover{
  color: #C00;
}

footer{
  margin:1.67em;
  padding:2em;
  border: solid 2px #efefef;
  background: #FFFFFF;
  font-size: 1.2em;
  line-height: 1.4em;
}
</style>
