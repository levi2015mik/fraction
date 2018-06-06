import axios from "axios"
import lsGroups from "./lsgroups"

/**
 * Работа с сервером
 * =================
 * Здесь находятся методы для работы с сервером
 * Отсюда же происходит временное локальное сохранение
 * в localStorage для последующей передачи
 * TODO Заглушка для тестирования
 * TODO Работа с сетью:
 * - загрузка персональных заданий
 * - Загрузка текстовых сообщений
 * - сохранение статистики
 * TODO Исправить ошибки по работе с localStorage
 */

const LSNAME = "fracMenu";  // Название набора данных из lsGroups
const STATISTIC = "stat";   // Название элемента из localStorage,
                            // в котором хранится статистика
let exercises;              // В этой переменной сохранен объект, управляющий localStorage

let exercisesStub = [
  {
    _id: 2424242,
    name: "Первый",
    component: "ReduceSimple",
    showRight: true,
    fraction: {
      num: {min: 1, max: 9},
      denom: {min: 1, max: 2},
      whole: {min: -9, max: 9},
      coef: {min: 1, max: 2},
      x: {min: 0, max: 5},
      y: {min: 0, max: 9}
    }
  },
  {
    _id: 2424267,
    name: "Второй",
    component: "ReduceSimple",
    showRight: true,
    fraction: {
      num: {min: 1, max: 9},
      denom: {min: 1, max: 2},
      whole: {min: -9, max: 9},
      coef: {min: 1, max: 2},
      x: {min: 0, max: 5},
      y: {min: 0, max: 9}
    }
  },
];
let statisticStub=[];
export default {
  async loadExercises(params){
      // Заглушка
      if(params.stub){
        return await exercisesStub
      }

      // Загрузка из localStorage
      if(params.local){
        exercises = new lsGroups.Element(LSNAME);
        return exercises.getAll()
      }

  },
  async saveExercise(params){
    let id = Date.now();
    exercises.set(id,params);
    return id

  },

  async updateExercises(num,value){
    exercises.set(num,value);
    return true
  },

  async deleteExercises(id){
    exercises.del(id);
    return true
  },

  async deleteAllExercises(){
    exercises.delAll();
    return true;
  },

  async loadStatistic(){
    let data = localStorage[STATISTIC];
    if(data === undefined) return [];
    return JSON.parse(data)
  },

  /**
   * Отправка на сервер статистики или сохранение ее в localStorage
   * @param el
   * @param collection
   */
  async pushStatistic(el,collection){
    localStorage[STATISTIC] = JSON.stringify(collection)
  },
  delStatistic(){
    delete localStorage[STATISTIC]
  }
}
