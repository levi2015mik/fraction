import _JSON$stringify from "babel-runtime/core-js/json/stringify";
/**
 * Методы работы с группами из localStorage вида name_index
 * Может быть применен лишь единожды в программе, так как вся коллекция,
 * независимо от имен, будет лежать в общей шине lsGroups.collection
 * TODO переделать в класс для применения нескольких в одной программе
 */

var lsGroups = {};

lsGroups.collection = [];

/**
 * Реализует чтение данных.
 * Возвращает массив значений
 * @param name
 * @returns {*} lsGroups.collection | err
 */
lsGroups.read = function (name) {
  try {
    var i = 0;
    for (var count in localStorage) {
      if (!localStorage.hasOwnProperty(count)) {
        continue;
      }
      var arr = void 0;
      arr = count.split("_");
      if (arr.length === 1) {
        continue;
      }
      if (arr[0] === name) {
        lsGroups.collection[i] = loadFromJson(count);
        i++;
      }
    }
    return lsGroups.collection;
  } catch (err) {
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
lsGroups.write = function (name, value) {
  lsGroups.read(name);
  //Внутренняя функция для записи в localStorage всего набора параметров из массива
  function writeAll() {
    try {
      for (var i = 0; i < lsGroups.collection.length; i++) {
        objToStorage(lsGroups.collection[i], name + "_" + i);
      }
    } catch (err) {
      return err;
    }
  }
  if (typeof value === "undefined") {
    writeAll();
    return;
  }
  try {
    var count = lsGroups.collection.length;
    lsGroups.collection.push(value);
    objToStorage(value, name + "_" + count);
    return count;
  } catch (err) {
    return err;
  }
};

/**
 * Обновление определенного элемента списка
 * @param num элемент
 * @param value значение
 */
lsGroups.update = function (num, value) {};

/**
 * Удаление всей группы или одного элемента
 * Для удаления всего списка num = "*"
 * @param name
 * @param {number | "*"} num номер элемента или "*" для удаления всего списка
 * @returns {*}
 */
lsGroups.del = function (name, num) {
  //Удаление всего массива для удобства выносится в новую функцию
  function delAll() {
    var i = 0;
    for (var count in localStorage) {
      if (!localStorage.hasOwnProperty(count)) {
        continue;
      }
      var arr = count.split("_");
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
    var i = 0;
    if (num === "*") {
      delAll();
      return;
    }
    //Удаление одного элемента
    lsGroups.collection.splice(num, 1);
    delAll();
    lsGroups.write(name);
  } catch (err) {
    return err;
  }
};

function objToStorage(obj, name) {
  var json = "";
  try {
    json = _JSON$stringify(obj);
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
function loadFromJson(name) {
  try {
    var data = localStorage[name];
    var obj = void 0;
    obj = JSON.parse(data);
    return obj;
  } catch (err) {
    return false;
  }
}

export default lsGroups;

//# sourceMappingURL=lsgroups-compiled.js.map