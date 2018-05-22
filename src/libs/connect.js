import axios from "axios"
import lsGroups from "./lsgroups"

/**
 * Работа с сервером
 * =================
 * Здесь находятся методы для работы с сервером
 * Отсюда же происходит временное локальное сохранение
 * в localStorage для последующей передачи
 * TODO Заглушка для тестирования
 */

const LSNAME = "fracMenu";  // Название набора данных из lsGroups

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
      if(params.local)
        return lsGroups.read(LSNAME);
  },
  async saveExercise(params){
    return lsGroups.write(LSNAME,params);

  },

  async updateExercises(num,value){
    lsGroups.update(LSNAME,num,value);
    return true
  },
  async deleteExercises(id){
    return lsGroups.del(LSNAME,id);

  },

  loadStatistic(){}
}
