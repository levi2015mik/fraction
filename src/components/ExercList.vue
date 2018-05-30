<template>
    <div id="list">
      <div id="fone" v-if="showSelectTemplates">
        <div id="dialog">
          <p>Выберите шаблон задания <button @click="showSelectTemplates=false">[X]</button></p>
          <button
            v-for="(template, name, id) in templates"
            :key="id"
            @click="addNew(name)"
          >
            {{name}}
          </button>
        </div>
      </div>
        <ul>
          <li v-for="(exerc, index) in exercises" :key="index">
            <router-link :to="/test/+exerc._id">{{exerc.name}}</router-link>
            <router-link :to="/settings/+exerc._id">Редактировать</router-link>
            <button @click="del(exerc._id)">[X]</button>
          </li>
        </ul>
      <hr/>
      <button class="add" @click="addNew()">Новое задание</button>
    </div>
</template>

<script>
  /**
   * Простой список заданий с функциями добавления и удаления
   * ========================================================
   */
  import store from "@/store"
  import  templates from "@/templates"


  export default {
        name: "ExercList",
        data(){
          return {
            showSelectTemplates:false,
            templates:templates
          }
        },
        computed:{
          exercises(){
            return store.state.exercises;
          }
        },
        methods:{
          async del(id){
            let acc = await store.dispatch("deleteExercise",id);
            // if(acc) alert("ok, deleted");
            // else {}
          },

          /**
           * Создание нового упражнения
           * 1 открытие диалога выбора шаблона нового упражнения
           * 2 Добавление пустого шаблона в коллекцию
           * 3 редирект на страницу настройки
           * Выбор шаблона для создания нового
           * @returns {Promise<void>}
           */
          async addNew(component){
            if(component === undefined) {
              this.showSelectTemplates = true;
              return false;
            }
            else {
              this.showSelectTemplates = false;
              let id = await store.dispatch("saveNewExercise",component);
              if(id || id === 0) this.$router.push("settings/" + id);
              else{}
              return true;
            }
          }
      }
  }
</script>

<style scoped>
  #list{
    margin-left: 2em;
    margin-right: 2em;
    margin-top: 2em;
    border: solid 2px #efefef;
    padding: 2em;
    background: #ffffff;
  }
#list button.add{
  font-size: 1.2em;
}
  ul{padding: 0}
  li{
    list-style: none;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    font-size: 1.2em;
  }
  li a{
    margin-right: 0.6em;
  }
  li a:nth-child(2) {
    font-size: 0.8em;
  }
  li button{
    background: #ffcccc;
    border: 0;
    padding: 0.3em;
    margin: 0;
  }
  #dialog{
    position: absolute;
    top: 30%;
    left:35%;
    border-radius: 0.7em;
    padding: 0;
    width: 20em;

    background: #dce4e9;
  }
  #dialog p{
    margin: 0 0 1.5em;
    padding: 0.6em;
    border-bottom: 1px solid;
  }
  #dialog p button{
    background: #d0d8dd;
    display: block;
    margin: 0 0 0 auto;
    float: right;
    padding: 0;
    font-size: 1em;
  }
  #dialog button{
    display: block;
    margin-left: 1.5em;
    margin-bottom: 1.5em;
    font-size: 1.2em;
  }
  #fone{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,32,0.5);
  }
</style>
