<template>
    <div>
        <div id="dialog" v-if="showSelectTemplates">
          <button
            v-for="(template, name, id) in templates"
            :key="id"
            @click="addNew(name)"
          >
            {{name}}
          </button>
        </div>
        <ul>
          <li v-for="(exerc, index) in exercises" :key="index">
            <router-link :to="/test/+exerc._id">{{exerc.name}}</router-link>
            <router-link :to="/settings/+exerc._id">Редактировать</router-link>
            <button @click="del(exerc._id)">удалить</button>
          </li>
        </ul>
      <button @click="addNew()">Новое</button>
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
        // TODO Заменить тестовую загрузку данных на рабочую
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
  div{
    font-size: 1.2em;
  }
  button{
    margin-left: 2em;
  }
</style>
