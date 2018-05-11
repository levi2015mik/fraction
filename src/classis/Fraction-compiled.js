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
   */
  function Fraction(num, denom, whole, sign) {
    _classCallCheck(this, Fraction);

    this.num = num;
    this.denom = denom;
    if (typeof whole != "undefined") this.whole = whole;else this.whole = 0;
    if (typeof sign != "undefined") this.sign = sign;else this.sign = 0;

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
        if (a % i == 0 && b % i == 0) {
          a = a / i;
          b = b / i;
          k++;
        }
      }
      if (k == 0) return false;else {
        var out = new Fraction(a, b, 0);
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
      return new Fraction(num, this.denom, whole);
    }

    /**
     * Преобразование к неправильной дроби, если есть целая часть
     * @returns {Fraction}
     */

  }, {
    key: "integrWhole",
    value: function integrWhole() {
      var num = this.whole * this.denom + this.num;
      return new Fraction(num, this.denom, 0);
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
      var out;
      var indicator = 1;
      if (this.num != 0) indicator *= this.num;
      if (this.denom != 0) indicator *= this.denom;
      if (this.whole < 0) {
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
        return;
      }

      out = new Fraction(num, denom, whole);
      out.sign = true;
      return out;
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
      while (denom == 0) {
        num = getIntRandom(config.num.min, config.num.max);
        denom = getIntRandom(config.denom.min, config.denom.max);
        whole = getIntRandom(config.whole.min, config.whole.max);
        var coef = getIntRandom(config.coef.min, config.coef.max);
        var x = getIntRandom(config.x.min, config.x.max);
        var y = getIntRandom(config.y.min, config.y.max);
        num = num * (coef * x);
        denom = denom * (coef * y);
      }
      return new Fraction(num, denom, whole);
    }
  }]);

  return Fraction;
}();

export default Fraction;

//# sourceMappingURL=Fraction-compiled.js.map