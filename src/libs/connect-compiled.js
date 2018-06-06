import _JSON$stringify from "babel-runtime/core-js/json/stringify";
import _regeneratorRuntime from "babel-runtime/regenerator";
import _asyncToGenerator from "babel-runtime/helpers/asyncToGenerator";
import axios from "axios";
import lsGroups from "./lsgroups";

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

var LSNAME = "fracMenu"; // Название набора данных из lsGroups
var STATISTIC = "stat"; // Название элемента из localStorage,
// в котором хранится статистика
var exercises = void 0; // В этой переменной сохранен объект, управляющий localStorage

var exercisesStub = [{
  _id: 2424242,
  name: "Первый",
  component: "ReduceSimple",
  showRight: true,
  fraction: {
    num: { min: 1, max: 9 },
    denom: { min: 1, max: 2 },
    whole: { min: -9, max: 9 },
    coef: { min: 1, max: 2 },
    x: { min: 0, max: 5 },
    y: { min: 0, max: 9 }
  }
}, {
  _id: 2424267,
  name: "Второй",
  component: "ReduceSimple",
  showRight: true,
  fraction: {
    num: { min: 1, max: 9 },
    denom: { min: 1, max: 2 },
    whole: { min: -9, max: 9 },
    coef: { min: 1, max: 2 },
    x: { min: 0, max: 5 },
    y: { min: 0, max: 9 }
  }
}];
var statisticStub = [];
export default {
  loadExercises: function loadExercises(params) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!params.stub) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return exercisesStub;

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
              if (!params.local) {
                _context.next = 7;
                break;
              }

              exercises = new lsGroups.Element(LSNAME);
              return _context.abrupt("return", exercises.getAll());

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  saveExercise: function saveExercise(params) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var id;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = Date.now();

              exercises.set(id, params);
              return _context2.abrupt("return", id);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },
  updateExercises: function updateExercises(num, value) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              exercises.set(num, value);
              return _context3.abrupt("return", true);

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  },
  deleteExercises: function deleteExercises(id) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              exercises.del(id);
              return _context4.abrupt("return", true);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },
  deleteAllExercises: function deleteAllExercises() {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              exercises.delAll();
              return _context5.abrupt("return", true);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this5);
    }))();
  },
  loadStatistic: function loadStatistic() {
    var _this6 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
      var data;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              data = localStorage[STATISTIC];

              if (!(data === undefined)) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt("return", []);

            case 3:
              return _context6.abrupt("return", JSON.parse(data));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, _this6);
    }))();
  },


  /**
   * Отправка на сервер статистики или сохранение ее в localStorage
   * @param el
   * @param collection
   */
  pushStatistic: function pushStatistic(el, collection) {
    var _this7 = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              localStorage[STATISTIC] = _JSON$stringify(collection);

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, _this7);
    }))();
  },
  delStatistic: function delStatistic() {
    delete localStorage[STATISTIC];
  }
};

//# sourceMappingURL=connect-compiled.js.map