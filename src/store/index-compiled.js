import _regeneratorRuntime from "babel-runtime/regenerator";
import _asyncToGenerator from "babel-runtime/helpers/asyncToGenerator";
import Vue from 'vue';
import Vuex from "vuex";
import connect from "@/libs/connect";
import templates from "@/templates";

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
  state: {
    test: true, // Данные для проверки
    exercises: [], // Список задангий
    statistic: [], // Статистика
    loaded: false, // Была ли выполнена загрузка
    loadedStat: false,
    uid: 0 // Идентификатор пользователя 0 - локальный
  },

  mutations: {
    /**
     * Мутация добавления нового упражнения.
     * TODO Возможно потребуются вспомогательные операции
     * @param state
     * @param payload
     */
    addExercise: function addExercise(state, payload) {
      state.exercises.push(payload);
    },


    /**
     * Внесение изменения в существующее упражнение
     * @param state
     * @param payload
     */
    updateExercise: function updateExercise(state, payload) {
      state.exercises[payload.index] = payload.settings;
    },


    /**
     * Удаление упражнения
     * @param state
     * @param id
     */
    delExercise: function delExercise(state, id) {
      state.exercises = state.exercises.filter(function (el) {
        return el._id !== id;
      });
    },
    delAllExercises: function delAllExercises(state) {
      state.exercises = [];
    },


    /**
     * Добавление новой записи статистики
     * @param state
     * @param payload
     */
    pushStatistic: function pushStatistic(state, payload) {
      state.statistic.push(payload);
    },
    delStatistic: function delStatistic(state) {
      state.statistic = [];
    },


    /**
     * Указание, что данные загружены и сервера
     * @param state
     */
    dataLoaded: function dataLoaded(state) {
      state.loaded = true;
    },
    statLoaded: function statLoaded(state) {
      state.loadedStat = true;
    }
  },

  actions: {
    /**
     * Упражнения
     * ----------
     */
    /**
     * Загрузка с сервера упражнений по набору условий
     * @param context
     * @param params
     */
    loadExercises: function loadExercises(_ref, params) {
      var _this = this;

      var commit = _ref.commit,
          dispatch = _ref.dispatch,
          state = _ref.state;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var data, el;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!state.loaded) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                _context.next = 4;
                return connect.loadExercises(params);

              case 4:
                data = _context.sent;

                console.log(data);

                _context.t0 = _regeneratorRuntime.keys(data);

              case 7:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 14;
                  break;
                }

                el = _context.t1.value;

                if (data.hasOwnProperty(el)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("continue", 7);

              case 11:
                commit("addExercise", data[el]);
                _context.next = 7;
                break;

              case 14:

                commit("dataLoaded");
                return _context.abrupt("return", true);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },


    /**
     * Сохранение нового упражнения на сервер и внесение его локально
     * @param commit
     * @param component
     */
    saveNewExercise: function saveNewExercise(_ref2, component) {
      var _this2 = this;

      var commit = _ref2.commit;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var el, name, id;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                el = {};

                // Клонирование объекта, хоть не красиво -
                // единственный способ получить рабочую схему

                for (name in templates[component]) {
                  el[name] = templates[component][name];
                }

                _context2.next = 4;
                return connect.saveExercise(el);

              case 4:
                id = _context2.sent;

                if (!(id || id === 0)) {
                  _context2.next = 11;
                  break;
                }

                el._id = id;
                commit("addExercise", el);
                return _context2.abrupt("return", id);

              case 11:
                return _context2.abrupt("return", false);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },


    /**
     * Обновление существующего упражнения
     * @param commit
     * @param state
     * @param settings
     */
    updateExercise: function updateExercise(_ref3, settings) {
      var commit = _ref3.commit,
          state = _ref3.state;

      for (var i = 0; i < state.exercises.length; i++) {
        if (state.exercises[i]._id === settings._id) {
          if (connect.updateExercises(settings._id, settings)) commit("updateExercise", { settings: settings, index: i });else {
            //TODO Обработка ошибки сохранения
          }
        }
      }
    },


    /**
     * Удаление упражнения по его _id
     * @param commit
     * @param state
     * @param id
     */
    deleteExercise: function deleteExercise(_ref4, id) {
      var _this3 = this;

      var commit = _ref4.commit,
          state = _ref4.state;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var acc;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return connect.deleteExercises(id, state);

              case 2:
                acc = _context3.sent;

                if (!acc) {
                  _context3.next = 8;
                  break;
                }

                commit("delExercise", id);
                return _context3.abrupt("return", true);

              case 8:
                return _context3.abrupt("return", false);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },
    delAllExercises: function delAllExercises(_ref5) {
      var _this4 = this;

      var commit = _ref5.commit;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        var acc;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return connect.deleteAllExercises();

              case 2:
                acc = _context4.sent;

                if (!acc) {
                  _context4.next = 8;
                  break;
                }

                commit("delAllExercises");
                return _context4.abrupt("return", true);

              case 8:
                return _context4.abrupt("return", false);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
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
    loadStatistic: function loadStatistic(_ref6, params) {
      var _this5 = this;

      var commit = _ref6.commit,
          state = _ref6.state;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        var statistic;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!state.loadedStat) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", false);

              case 2:
                _context5.next = 4;
                return connect.loadStatistic(params);

              case 4:
                statistic = _context5.sent;

                statistic.forEach(function (el) {
                  commit("pushStatistic", el);
                });
                commit("statLoaded");

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    },


    /**
     * Добавление новой записи статистики
     * @param commit
     * @param state
     * @param stat
     */
    pushStatistic: function pushStatistic(_ref7, stat) {
      var commit = _ref7.commit,
          state = _ref7.state;

      stat.time = Date.now();
      stat.uid = state.uid;
      commit("pushStatistic", stat);
      connect.pushStatistic(stat, state.statistic);
    },
    delStatistic: function delStatistic(_ref8) {
      var commit = _ref8.commit;

      connect.delStatistic();
      commit("delStatistic");
    }
  }
});

//# sourceMappingURL=index-compiled.js.map