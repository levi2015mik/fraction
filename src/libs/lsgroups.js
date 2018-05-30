/**
 * Методы работы с группами из localStorage вида name_index
 * Может быть применен лишь единожды в программе, так как вся коллекция,
 * независимо от имен, будет лежать в общей шине lsGroups.collection
 * TODO Сделать возможность произвольно задавать индексы
 */

let lsGroups = {};

lsGroups.collection = [];

/**
 * Реализует чтение данных.
 * Возвращает массив значений
 * @param name
 * @returns {*} lsGroups.collection | err
 */
lsGroups.read = function(name) {
  try {
    let i = 0;
    for(let count in localStorage) {
      if(!localStorage.hasOwnProperty(count)) {
        continue;
      }
      let arr;
      arr = count.split("_");
      if(arr.length === 1){
        continue;
      }
      if(arr[0] === name) {
        lsGroups.collection[i] = loadFromJson(count);
        i++;
      }
    }
    return lsGroups.collection;
  } catch(err) {
    return err;
  }
};

/**
 * Сохраняет value в localStorage с именем вида name_index
 * сохранение происходит под следующим после последнего номером
 * @param name
 * @param {object} value
 * @returns {*} индекс сохраненного элемента или err
 */
lsGroups.write = function(name,value){
  lsGroups.read(name);
  //Внутренняя функция для записи в localStorage всего набора параметров из массива
  function writeAll(){
    try {
      for(let i = 0; i<lsGroups.collection.length; i++){
        objToStorage(lsGroups.collection[i],name + "_" + i);
      }
    } catch (err) {
      return err;
    }
  }
  if(typeof value === "undefined") {
    writeAll();
    return;
  }
  try {
    let count = lsGroups.collection.length;
    lsGroups.collection.push(value);
    objToStorage(value,name + "_" + count);
    return count;
  } catch(err) {
    return err;
  }
};

/**
 * Обновление определенного элемента списка
 * @param name название
 * @param num элемент
 * @param value значение
 */
lsGroups.update = function(name,num,value){
  value = JSON.stringify(value);
  localStorage[name + "_" + num] = value;
};

/**
 * Удаление всей группы или одного элемента
 * Для удаления всего списка num = "*"
 * @param name
 * @param {number | "*"} num номер элемента или "*" для удаления всего списка
 * @returns {*}
 */
lsGroups.del = function(name, num){
  //Удаление всего массива для удобства выносится в новую функцию
  function delAll() {
    let i = 0;
    for (let count in localStorage) {
      if (!localStorage.hasOwnProperty(count)) {
        continue;
      }
      let arr = count.split("_");
      if (arr.length === 1) {
        continue;
      }
      if (arr[0] === name) {
        delete localStorage[name + "_" + i];
        i++;
      }
    }
  }
  try {
    let i = 0;
    if(num ==="*") {
      delAll();
      return true;
    }

    //Удаление одного элемента
    lsGroups.collection.splice(num,1);
    delAll();
    lsGroups.write(name);
    return true;

  } catch (err) {
    return err;
  }
};

function objToStorage(obj,name) {
  let json = "";
  try {
    json = JSON.stringify(obj);
  } catch (err) {
    alert("Невозможно преобразовать объект");
    return;
  }
  try {
    localStorage[name] = json;
  } catch (err) {
    alert("Браузер не поддерживает localStorage сохранение невозможно");
    return err;
  }
  return json;
}

//
function loadFromJson(name){
  try{
    let data = localStorage[name];
    let obj;
    obj = JSON.parse(data);
    return obj;
  } catch (err) {
    return false;
  }
}

export default lsGroups;
