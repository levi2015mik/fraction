/**
 * Created by 1111 on 10.05.2018.
 * Класс дробь.
 */

import {getIntRandom} from "../functions"

class Fraction {

  /**
   * Конструктор дроби
   * @param num {number} числитель
   * @param denom {number} знаменатель
   * @param whole {number} целая часть
   * @param sign {boolean} Знак числа. Если true - отрицательное
   */
  constructor(num,denom,whole,sign){
    if(typeof num != "undefined")
      this.num = num;
    if(typeof denom != "undefined")
    this.denom = denom;
    if(typeof whole != "undefined")
      this.whole = whole;
    if(typeof sign != "undefined")
      this.sign = sign;
    this.signify(true);
  }

  /**
   * Сокращение дробей.
   * Если невозможно сократить - возвращает false
   * @returns {boolean|Fraction}
   */
  reduce(){
    var self = this.integrWhole();
    var a = self.num;
    var b = self.denom;
    var k = 0;
    for(var i = 2; i<999;i++){
      if(a%i == 0 && b%i == 0){
        a = a/i;
        b = b/i;
        k ++;
      }
    }
    if(k == 0) return false;
    else {
      let out = new Fraction(a,b,0,this.sign);
      out.sign = this.sign;
      return out
    }
  }

  /**
   * Выделение целой части
   * @returns {Fraction}
   */
  isolateWhole(){
    if(this.num < this.denom) return this;
    var whole = Math.floor(this.num / this.denom) + this.whole;
    var num = this.num % this.denom;
    return new Fraction(num,this.denom,whole,this.sign)
  }

  /**
   * Преобразование к неправильной дроби, если есть целая часть
   * @returns {Fraction}
   */
  integrWhole() {
    var num = this.whole * this.denom + this.num;
    return new Fraction(num, this.denom, 0,this.sign);
  }

  /**
   * Определение знака дроби. Если внутри дроби возникнет отрицательный знак,
   * он выносится в свойство sign
   * @param local {boolean} Записывать параметры в текущий экземпляр Fraction
   * @returns {Fraction} Вывод результата
   */
  signify(local){
    var out;
    var indicator = 1;
    if(this.num != 0 && this.num != undefined)
      indicator *= this.num;
    if(this.denom != 0 && this.denom != undefined)
      indicator *= this.denom;
    if(this.whole < 0 && this.whole != undefined) {
      indicator = -1;
    }

    if(indicator >= 0)
      return this;
    var num = this.num;
    var denom = this.denom;
    var whole = this.whole;
    if(num < 0) num = num * -1;
    if(denom < 0) denom = denom * -1;
    if(whole < 0) whole = whole * -1;

    if(local){
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
   * Сравнение двух дробей. Если они равны - возвращает true
   * @param {Fraction} testable
   * @returns {boolean}
   */
  equal(testable){
    if(
      this.num == testable.num &&
      this.denom == testable.denom &&
      this.whole == testable.whole &&
      this.sign == testable.sign
    )
      return true;
    else
      return false;
  }

  /**
   * Генерация случайной дроби с произвольными параметрами
   * @param config Набор настроек
   * @returns {Fraction}
   */
  static generate(config){
    var num = 0, denom = 0, whole = 0 ;
    while(denom == 0) {
      num = getIntRandom(config.num.min, config.num.max);
      denom = getIntRandom(config.denom.min, config.denom.max);
      whole = getIntRandom(config.whole.min, config.whole.max);
      let coef = getIntRandom(config.coef.min, config.coef.max);
      let x = getIntRandom(config.x.min, config.x.max);
      let y = getIntRandom(config.y.min, config.y.max);
      num = num * (coef * x);
      denom = denom * (coef * y);
    }
    return new Fraction(num,denom,whole)
  }
}

export default Fraction
