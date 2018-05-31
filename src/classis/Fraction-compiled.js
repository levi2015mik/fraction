import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
/**
 * Created by 1111 on 10.05.2018.
 * Класс дробь.
 */

import { getIntRandom } from "../functions";

var Fraction = function () {

  /**
   * Конструктор дроби
   * @param num {number} числитель
   * @param denom {number} знаменатель
   * @param whole {number} целая часть
   * @param sign {boolean} Знак числа. Если true - отрицательное
   */
  function Fraction(num, denom, whole, sign) {
    _classCallCheck(this, Fraction);

    if (typeof num !== "undefined") this.num = num;
    if (typeof denom !== "undefined") this.denom = denom;
    if (typeof whole !== "undefined") this.whole = whole;
    if (typeof sign !== "undefined") this.sign = sign;
    this.signify(true);
  }

  /**
   * Сокращение дробей.
   * Если невозможно сократить - возвращает false
   * @returns {boolean|Fraction}
   */


  _createClass(Fraction, [{
    key: "reduce",
    value: function reduce() {
      var self = this.integrWhole();
      var a = self.num;
      var b = self.denom;
      var k = 0;
      for (var i = 2; i < 999; i++) {
        if (a % i === 0 && b % i === 0) {
          a = a / i;
          b = b / i;
          k++;
          i = 1;
        }
      }
      if (k === 0) return false;else {
        var out = new Fraction(a, b, 0, this.sign);
        out.sign = this.sign;
        return out;
      }
    }

    /**
     * Выделение целой части
     * @returns {Fraction}
     */

  }, {
    key: "isolateWhole",
    value: function isolateWhole() {
      if (this.num < this.denom) return this;
      var whole = Math.floor(this.num / this.denom) + this.whole;
      var num = this.num % this.denom;
      return new Fraction(num, this.denom, whole, this.sign);
    }

    /**
     * Преобразование к неправильной дроби, если есть целая часть
     * @returns {Fraction}
     */

  }, {
    key: "integrWhole",
    value: function integrWhole() {
      var num = this.whole * this.denom + this.num;
      return new Fraction(num, this.denom, 0, this.sign);
    }

    /**
     * Определение знака дроби. Если внутри дроби возникнет отрицательный знак,
     * он выносится в свойство sign
     * @param local {boolean} Записывать параметры в текущий экземпляр Fraction
     * @returns {Fraction} Вывод результата
     */

  }, {
    key: "signify",
    value: function signify(local) {
      var out = void 0;
      var indicator = 1;
      if (this.num !== 0 && this.num !== undefined) indicator *= this.num;
      if (this.denom !== 0 && this.denom !== undefined) indicator *= this.denom;
      if (this.whole < 0 && this.whole !== undefined) {
        indicator = -1;
      }

      if (indicator >= 0) return this;
      var num = this.num;
      var denom = this.denom;
      var whole = this.whole;
      if (num < 0) num = num * -1;
      if (denom < 0) denom = denom * -1;
      if (whole < 0) whole = whole * -1;

      if (local) {
        this.num = num;
        this.denom = denom;
        this.whole = whole;
        this.sign = true;
        return this;
      }

      out = new Fraction(num, denom, whole, true);
      out.sign = true;
      return out;
    }

    /**
     * Сравнение двух дробей. Если они равны - возвращает true
     * @param {Fraction} testable
     * @returns {boolean}
     */

  }, {
    key: "equal",
    value: function equal(testable) {
      return this.num === testable.num && (this.denom === testable.denom || this.denom === 0 && testable.denom === undefined || this.denom === undefined && testable.denom === 0) && (this.whole === testable.whole || this.whole === 0 && testable.whole === undefined || this.whole === undefined && testable.whole === 0) && (this.sign === testable.sign || this.sign === false && testable.sign === undefined || this.sign === undefined && testable.sign === false) || (this.num === 0 && testable.num === undefined || this.num === undefined && testable.num === 0) && (this.sign === testable.sign || this.sign === false && testable.sign === undefined || this.sign === undefined && testable.sign === false) && (this.whole === testable.whole || this.whole === 0 && testable.whole === undefined || this.whole === undefined && testable.whole === 0) || this.denom === 1 && template.denom === 1 && (this.sign === testable.sign || this.sign === false && testable.sign === undefined || this.sign === undefined && testable.sign === false) && (this.whole === testable.whole || this.whole === 0 && testable.whole === undefined || this.whole === undefined && testable.whole === 0);
    }

    /**
     * Генерация случайной дроби с произвольными параметрами
     * @param config Набор настроек
     * @returns {Fraction}
     */

  }], [{
    key: "generate",
    value: function generate(config) {
      var num = 0,
          denom = 0,
          whole = 0;

      var multiple = function multiple() {
        var coef = getIntRandom(config.coef.min, config.coef.max);
        var x = getIntRandom(config.x.min, config.x.max);
        var y = getIntRandom(config.y.min, config.y.max);
        num = num * (coef * x);
        denom = denom * (coef * y);
      };
      var generate = function generate() {
        num = getIntRandom(config.num.min, config.num.max);
        denom = getIntRandom(config.denom.min, config.denom.max);
        whole = getIntRandom(config.whole.min, config.whole.max);

        var iterate = getIntRandom(config.iterate.min, config.iterate.max);
        if (iterate < 1) iterate = 1;
        while (iterate) {
          if (config.onlyRight) {
            do {
              multiple();
            } while (num > denom);
          } else multiple();
          iterate--;
        }
      };

      var firstCode = 0,
          secondCode = 0;

      // Генерируем только такие дроби, в которых дробная часть не равна единице
      if (config.onlyFrac) {
        while (num === denom) {
          firstCode++;

          // Аварийный перезапуск
          if (firstCode === 50) return Fraction.generate(config);

          // Запрет нуля в числителе и знаменателе
          if (config.notZero) {
            while (denom === 0 || num === 0) {
              secondCode++;
              if (secondCode === 1000) alert("Big inner notZero");
              generate();
            }
          }

          // Запрет нуля только в числителе
          else {
              while (denom === 0) {
                if (secondCode === 1000) alert("Big inner");
                secondCode++;
                generate();
              }
            }
        }
        if (num === denom) alert(firstCode);
      }

      // Генерация примера, в котором числитель может быть равен знаменателю
      else {
          if (config.notZero) while (denom === 0 || num === 0) {
            secondCode++;
            generate();
          } else while (denom === 0) {
            secondCode++;
            generate();
          }
        }

      return new Fraction(num, denom, whole, false);
    }
  }]);

  return Fraction;
}();
//module.exports = Fraction;


export default Fraction;

//# sourceMappingURL=Fraction-compiled.js.map