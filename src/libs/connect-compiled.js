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
 */

var LSNAME = "fracMenu"; // Название набора данных из lsGroups

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
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", lsGroups.read(LSNAME));

            case 6:
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
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", lsGroups.write(LSNAME, params));

            case 1:
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
              lsGroups.update(LSNAME, num, value);
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
              return _context4.abrupt("return", lsGroups.del(LSNAME, id));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },
  loadStatistic: function loadStatistic() {}
};

//# sourceMappingURL=connect-compiled.js.map