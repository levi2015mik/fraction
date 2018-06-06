<template>
  <div id="app">
    <header>
      <h1>Сокращение дробей</h1>
      <nav>
        <router-link to="/">Главное меню</router-link>
        <router-link to="/statistic">Статистика</router-link>
      </nav>
    </header>

    <router-view/>
    <footer>
      version 0.0.3<br/>
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
header{
  margin-top: 3em;
  margin-left: 5em;
  margin-bottom: 3em;
}
nav{
  /*margin:0.6em;*/
  margin-top: 0.6em;
  margin-left: 2em;
  font-size: 1.3em;
}
h1{
  margin-bottom: 0.5em;
  color: #006666;
  font-family: "Cylfaen",serif;
  font-size: 3em;
  font-variant: small-caps;
}
nav a{
  padding-right: 1.5em;
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
