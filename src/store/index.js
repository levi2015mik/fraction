import Vue from 'vue'
import Vuex from "vuex"
import connect from "@/libs/connect"
import templates from "@/templates"

/**
 * Основные переменные состояния
 * =============================
 * Здесь содержится инструментарий для работы с двумя главными элементами приложения
 * - упражнениями
 * - статистикой
 * Здесь содержатся данные, методы загрузки, сохранения и изменения
 */

Vue.use(Vuex);
// noinspection JSUnusedGlobalSymbols
export default new Vuex.Store({
  state:{
    test:true,     // Данные для проверки
    exercises:[],  // Список задангий
    statistic:[],  // Статистика
    loaded:false,  // Была ли выполнена загрузка
    loadedStat:false,
    uid:0          // Идентификатор пользователя 0 - локальный
  },


  mutations:{
    /**
     * Мутация добавления нового упражнения.
     * TODO Возможно потребуются вспомогательные операции
     * @param state
     * @param payload
     */
    addExercise(state,payload){
      state.exercises.push(payload)
    },

    /**
     * Внесение изменения в существующее упражнение
     * @param state
     * @param payload
     */
    updateExercise(state, payload){
      state.exercises[payload.index] = payload.settings
    },

    /**
     * Удаление упражнения
     * @param state
     * @param id
     */
    delExercise(state,id){
      state.exercises = state.exercises.filter(el=>el._id !== id)
    },

    /**
     * Добавление новой записи статистики
     * @param state
     * @param payload
     */
    pushStatistic(state,payload){
      state.statistic.push(payload)
    },

    /**
     * Указание, что данные загружены и сервера
     * @param state
     */
    dataLoaded(state){
      state.loaded = true
    },
    statLoaded(state){
      state.loadedStat = true
    }
  },


  actions:{
    /**
     * Упражнения
     * ----------
     */
    /**
     * Загрузка с сервера упражнений по набору условий
     * @param context
     * @param params
     */
    async loadExercises({commit,dispatch,state}, params) {
      if(state.loaded)return false;
      let data = await connect.loadExercises(params);
      data.forEach(el=>commit("addExercise",el));
      commit("dataLoaded");
      return true;
    },

    /**
     * Сохранение нового упражнения на сервер и внесение его локально
     * @param commit
     * @param component
     */
    async saveNewExercise({commit},component){
      let el = {};
      // Клонирование объекта, хоть не красиво -
      // единственный способ получить рабочую схему
      for(let name in templates[component]) {
        el[name] = templates[component][name]
      }

      let id = await connect.saveExercise(el);
      if(id || id === 0) {
        el._id = id;
        commit("addExercise", el);
        return id;
      }
      else return false;
    },

    /**
     * Обновление существующего упражнения
     * @param commit
     * @param state
     * @param settings
     */
    updateExercise({commit,state},settings){
      for(let i = 0;i < state.exercises.length;i ++){
        if(state.exercises[i]._id === settings._id){
          if(connect.updateExercises(settings._id,settings))
            commit("updateExercise",{settings:settings, index:i})
          else {
            //TODO Обработка ошибки сохранения
          }
        }
      }

    },

    /**
     * Удаление упражнения по его _id
     * @param commit
     * @param id
     */
    async deleteExercise({commit},id){
      let acc = await connect.deleteExercises(id);
      if(acc) {
        commit("delExercise", id);
        return true
      }
      else return false;
    },

    /**
     * Статистика
     * ----------
     */

    /**
     * Загрузка статистики по условиям
     * @param commit
     * @param state
     * @param params
     */
    async loadStatistic({commit, state},params){
      if(state.loadedStat)return false;
      let statistic = await connect.loadStatistic(params);
      statistic.forEach(el=>{
        commit("pushStatistic",el);
      });
      commit("statLoaded")
    },

    /**
     * Добавление новой записи статистики
     * @param commit
     * @param state
     * @param stat
     */
    pushStatistic({commit,state},stat){
      stat.time = Date.now();
      stat.uid = state.uid;
      commit("pushStatistic",stat);
      connect.pushStatistic(stat,state.statistic);
    }
  }
})
