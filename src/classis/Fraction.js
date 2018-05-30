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
    if(typeof num !== "undefined")
      this.num = num;
    if(typeof denom !== "undefined")
    this.denom = denom;
    if(typeof whole !== "undefined")
      this.whole = whole;
    if(typeof sign !== "undefined")
      this.sign = sign;
    this.signify(true);
  }

  /**
   * Сокращение дробей.
   * Если невозможно сократить - возвращает false
   * @returns {boolean|Fraction}
   */
  reduce(){
    let self = this.integrWhole();
    let a = self.num;
    let b = self.denom;
    let k = 0;
    for(let i = 2; i<999;i++){
      if(a%i === 0 && b%i === 0){
        a = a/i;
        b = b/i;
        k ++;
        i = 1;
      }
    }
    if(k === 0) return false;
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
    let whole = Math.floor(this.num / this.denom) + this.whole;
    let num = this.num % this.denom;
    return new Fraction(num,this.denom,whole,this.sign)
  }

  /**
   * Преобразование к неправильной дроби, если есть целая часть
   * @returns {Fraction}
   */
  integrWhole() {
    let num = this.whole * this.denom + this.num;
    return new Fraction(num, this.denom, 0,this.sign);
  }

  /**
   * Определение знака дроби. Если внутри дроби возникнет отрицательный знак,
   * он выносится в свойство sign
   * @param local {boolean} Записывать параметры в текущий экземпляр Fraction
   * @returns {Fraction} Вывод результата
   */
  signify(local){
    let out;
    let indicator = 1;
    if(this.num !== 0 && this.num !== undefined)
      indicator *= this.num;
    if(this.denom !== 0 && this.denom !== undefined)
      indicator *= this.denom;
    if(this.whole < 0 && this.whole !== undefined) {
      indicator = -1;
    }

    if(indicator >= 0)
      return this;
    let num = this.num;
    let denom = this.denom;
    let whole = this.whole;
    if(num < 0) num = num * -1;
    if(denom < 0) denom = denom * -1;
    if(whole < 0) whole = whole * -1;

    if(local){
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
  equal(testable){
    return this.num === testable.num
      &&
      (this.denom === testable.denom ||
        (this.denom === 0 && testable.denom === undefined) ||
        (this.denom === undefined && testable.denom === 0)
      ) &&
      (this.whole === testable.whole ||
        (this.whole === 0 && testable.whole === undefined) ||
        (this.whole === undefined && testable.whole === 0)
      ) &&
      (this.sign === testable.sign ||
        (this.sign === false && testable.sign === undefined) ||
        (this.sign === undefined && testable.sign === false)
      ) ||
      (
        (
          (this.num === 0 && testable.num === undefined) ||
          (this.num === undefined && testable.num === 0)
        ) &&
        (
          this.sign === testable.sign ||
          (this.sign === false && testable.sign === undefined) ||
          (this.sign === undefined && testable.sign === false)
        ) &&
        (
          this.whole === testable.whole ||
          (this.whole === 0 && testable.whole === undefined) ||
          (this.whole === undefined && testable.whole === 0)
        )
      ) ||
      (
        this.denom === 1 && template.denom === 1 &&
        (
          this.sign === testable.sign ||
          (this.sign === false && testable.sign === undefined) ||
          (this.sign === undefined && testable.sign === false)
        ) &&
        (
          this.whole === testable.whole ||
          (this.whole === 0 && testable.whole === undefined) ||
          (this.whole === undefined && testable.whole === 0)
        )
      );
  }

  /**
   * Генерация случайной дроби с произвольными параметрами
   * @param config Набор настроек
   * @returns {Fraction}
   */
  static generate(config){
    let num = 0, denom = 0, whole = 0 ;

    let multiple = ()=>{
      let coef = getIntRandom(config.coef.min, config.coef.max);
      let x = getIntRandom(config.x.min, config.x.max);
      let y = getIntRandom(config.y.min, config.y.max);
      num = num * (coef * x);
      denom = denom * (coef * y);
    };
    let generate = ()=>{
      num = getIntRandom(config.num.min, config.num.max);
      denom = getIntRandom(config.denom.min, config.denom.max);
      whole = getIntRandom(config.whole.min, config.whole.max);

      let iterate = getIntRandom(config.iterate.min, config.iterate.max);
      if(iterate < 1) iterate = 1;
      while(iterate) {
        if(config.onlyRight){
          do multiple(); while (num > denom)
        }
        else
          multiple();
        iterate --
      }
    };

    if(config.onlyFrac){
      while (num === denom) {
        if (config.notZero) {
          while (denom === 0 || num === 0)
            generate();
        }
        else
          while (denom === 0)
            generate();
      }
    }

    else {
      if (config.notZero)
        while (
          denom === 0 || num === 0)
          generate();
      else
        while (
          denom === 0)
          generate();
    }


    return new Fraction(num,denom,whole,false);


  }
}
//module.exports = Fraction;
export default Fraction
